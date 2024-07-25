<template>
  <div
    class="senja-embed"
    data-id="6e74a851-b499-491c-aaa3-9248e85f8fe9"
    data-mode="shadow"
    data-lazyload="true"
    style="display: block"
  ></div>
</template>

<script setup>
console.log("hi")
useHead({
  script: [
    {
      src: "https://widget.senja.io/widget/2be3088b-e62c-4732-9904-abec8d2ef0a2/platform.js",
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
