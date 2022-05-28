<template>
  <div class="welcome m-auto bg-slate-800">
    <div class="flex justify-center items-center min-h-screen">
      <div class="flex flex-col items-center">
        <div class="font-bold text-xl mb-10">
          Welcome to Mini Game
        </div>
        <div class="list_option flex gap-x-3">
          <div v-for="option in optionList" :key="option.key" @click="
            () => {
              handleSelected(option);
            }
          " class="item text-xl px-4 py-2 cursor-pointer bg-amber-800 rounded-md">
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()
const optionList = ref([
  { key: 1, name: "4 X 2", width: 4, height: 2, amount: 4 * 2 },
  { key: 2, name: "4 X 3", width: 4, height: 3, amount: 4 * 3 },
  { key: 2, name: "4 X 4", width: 4, height: 4, amount: 4 * 4 },
])

const handleSelected = (selected) => {
  console.log("🚀 ~ file: HomeView.vue ~ line 48 ~ handleSelected ~ selected", selected)
  store.commit('selectMode', selected)
  router.push('/main')
}
</script>
