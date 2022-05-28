<template>
  <div class="bg-slate-800 min-h-screen pb-10">
    <div class="wrap_box mb-10 p-10">
      <div v-for="(card, index) in cards" :key="index" class="box" :class="{ 'selected': card.isSelected }"
        @click="() => { handleSelectCard(card, index) }">
        <div class="front_face" :style="{ 'background-color': card.color }"></div>
        <div class="back_face"></div>
      </div>
    </div>
    <div v-if="checkFinish" class="flex justify-center gap-x-6">
      <button type="button" class="py-2 px-4 bg-sky-400 rounded" @click="() => { cards = initCards(amountCard) }">Try
        again</button>
      <button type="button" class="py-2 px-4 bg-red-500 rounded" @click="() => { router.push('/') }">Back</button>
    </div>
    <Teleport to="#app">
      <ModalPopup :openModal="openModal">
        <p class="text-black font-bold">Congratulations!</p>
        <template #footer>
          <button type="button" class="py-2 px-4 bg-red-500 rounded w-full"
            @click="() => { openModal = false }">Close</button>
        </template>
      </ModalPopup>
    </Teleport>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ModalPopup from "../components/ModalPopup.vue";
const initCards = (amountCard) => {
  if (Number(amountCard) % 2 > 0) throw new Error("Amount Card must be divide by 2")
  const coupleCard = amountCard / 2
  const cardCreate = Array.from({ length: coupleCard }, (_, i) => ({ id: i, isSelected: false, finish: false, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` }))
  let randomCard = [];
  for (let index = 0; index < 3; index++) {
    randomCard = [...cardCreate, ...cardCreate].sort(() => 0.5 - Math.random());
  }
  return randomCard
}
const DEFAULT_AMOUNT_CARD = 12
const store = useStore()
const router = useRouter()
const amountCard = Object.keys(store.state.modeGame).length > 0 ? store.state.modeGame.amount : DEFAULT_AMOUNT_CARD
let cards = ref(initCards(amountCard))
const openModal = ref(false)
let coupleCardSelected = ref([null, null]);



const handleSelectCard = (card, indexCard) => {
  if (card.isSelected) throw new Error("This card is selected")
  if (coupleCardSelected.value[0] === null) {
    coupleCardSelected.value[0] = card
  } else if (coupleCardSelected.value[1] === null) {
    coupleCardSelected.value[1] = card
  } else {
    return
  }
  cards.value = cards.value.map((item, index) => index === indexCard ? ({ ...item, isSelected: true }) : item)
  if (coupleCardSelected.value[0] === null || coupleCardSelected.value[1] === null) return
  const compareCard = () => {
    if (coupleCardSelected.value[0]['id'] === coupleCardSelected.value[1]['id']) {
      cards.value = cards.value.map(card => card.id === coupleCardSelected.value[0]['id'] ? ({ ...card, finish: true }) : card)
    }
    else {
      cards.value = cards.value.map(item => item.finish ? item : ({ ...item, isSelected: false }))
    }
    coupleCardSelected.value = [null, null]
  }
  setTimeout(compareCard, 500)
}

const checkFinish = computed(() => {
  const isFinish = cards.value.every(e => e.finish)
  openModal.value = isFinish
  return isFinish
}) 
</script>
<style scoped lang="scss">
.wrap_box {
  display: flex;
  flex-wrap: wrap;
}

.box {
  min-width: 150px;
  max-width: 200px;
  height: 250px;
  position: relative;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 500px;
  margin: 1rem;

  .back_face,
  .front_face {
    position: absolute;
    border-radius: 8px;
    box-shadow: inset 0 0 0 10px #ffffff4e;
    transform: rotateY(0deg);
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-image: url('/src/assets/back_bg.jpg');
    background-size: cover;
    background-position: center;
    z-index: 1;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .front_face {
    background-image: none;
    // background-color: aquamarine;
    transform: rotateY(-180deg);
    z-index: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  }

  &.selected {
    .back_face {
      transform: rotateY(180deg);
    }

    .front_face {
      transform: rotateY(0deg);
    }
  }
}
</style>
