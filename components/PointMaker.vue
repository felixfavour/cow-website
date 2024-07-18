<template>
  <div class="section point-maker py-[5%]">
    <div
      class="inner flex items-center justify-between gap-10"
      :class="{ 'flex-row-reverse': !isTextStart }"
    >
      <div class="col flex flex-col gap-5 w-[45%] justify-start">
        <slot name="texts" />
      </div>
      <div class="col img-ctn min-h-[620px] w-[45%] moving-bg-anim">
        <slot name="img"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isTextStart: Boolean,
})
</script>

<style scoped>
.img-ctn {
  background: linear-gradient(
    270deg,
    rgba(255, 215, 212, 1) 0%,
    rgba(238, 219, 255, 1) 100%
  );
  border-radius: 32px;
  background-size: 150%;
}
</style>
