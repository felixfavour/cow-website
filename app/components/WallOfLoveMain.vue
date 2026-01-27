<template>
  <div class="testimonial-bg section min-h-[200px]">
    <div class="testimonial-bg-overlay"></div>

    <div class="py-[10%] md:py-[5%] relative h-[100%] inset-0">
      <div
        class="senja-embed"
        data-id="6b57264e-2b44-4db4-8617-2da542280734"
        data-mode="shadow"
        data-lazyload="false"
        style="display: block"
      />
    </div>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: "https://widget.senja.io/widget/6b57264e-2b44-4db4-8617-2da542280734/platform.js",
      defer: true,
    },
  ],
})
</script>

<style scoped>
.senja-embed {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.testimonial-bg {
  background: linear-gradient(
    -90deg,
    rgba(137, 70, 201, 1) 0%,
    rgba(68, 34, 99, 1) 100%
  );
  background-size: cover;
  background-position: center;
  position: relative;
}
.testimonial-bg-overlay {
  position: absolute;
  inset: 0;
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/ctn-bg.webp")
    center no-repeat;
  background-size: cover;
}
</style>
