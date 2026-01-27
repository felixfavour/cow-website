<template>
  <div class="section point-maker py-[7.5%] lg:py-[3%]">
    <div
      class="inner flex flex-col-reverse lg:flex-row items-center justify-between gap-10"
      :class="{ 'lg:flex-row-reverse': !isTextStart }"
    >
      <div class="col flex flex-col gap-5 w-[95%] lg:w-[45%] justify-start">
        <slot name="texts" />
      </div>
      <div
        class="col img-ctn min-h-[250px] md:min-h-[400px] 2xl:min-h-[620px] w-[90%] lg:w-[45%] rounded-[32px] moving-bg-anim"
      >
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
  background-size: 150%;
  display: grid;
  place-items: center;
}
</style>
