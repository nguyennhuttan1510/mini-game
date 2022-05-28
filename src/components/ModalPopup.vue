<template>
    <Transition name="modal">
        <div v-if="props.openModal" class="flex justify-center items-center fixed w-full h-full z-10">
            <div class="bg-black fixed w-full h-full z-0 opacity-50"></div>

            <div class="flex justify-center items-center flex-col gap-y-6 py-10 px-20 rounded-lg bg-white z-10">
                <!-- <div class="mb-6"> -->
                    <slot name="header"></slot>
                <!-- </div> -->
                <slot></slot>
                <slot name="footer">
                </slot>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    openModal: Boolean
})
</script>
<style lang="scss">
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>