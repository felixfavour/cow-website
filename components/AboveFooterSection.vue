<template>
  <div class="section above-footer my-[5%]">
    <div
      class="inner flex flex-col lg:flex-row justify-between items-center p-6 py-10 md:p-12 md:py-16 lg:p-[5%] lg:py-[5%] rounded-[32px] bg-[#FFE9E8] overflow-hidden gap-8 lg:gap-0"
    >
      <div class="texts w-[95%] lg:w-[40%]">
        <h3 class="text-3xl 2xl:text-4xl font-bold">
          Cloud of Worship is your church’s literal
          <span class="emphasis-text">powerpoint</span>.
        </h3>
        <div class="early-users flex my-[3%] lg:my-[7%]">
          <img
            src="~/assets/images/rccg.webp"
            loading="lazy"
            alt="Early Users"
            class="w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-cover rounded-full border-2 md:border-4 border-purple-600"
          />
          <img
            src="~/assets/images/foursquare.webp"
            loading="lazy"
            alt="Early Users"
            class="w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-cover rounded-full border-2 md:border-4 border-purple-600 relative ml-[-10px]"
          />
          <img
            src="~/assets/images/elevation-church-box.webp"
            loading="lazy"
            alt="Early Users"
            class="w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-cover rounded-full border-2 md:border-4 border-purple-600 relative ml-[-10px]"
          />
        </div>
        <div class="actions mt-8 md:mt-[3%]">
          <a
            href="https://app.cloudofworship.com/signup"
            class="primary-btn taller w-[220px]"
          >
            Get started for free
          </a>
          <div class="helper-text text-sm pt-2">
            serving <span class="font-semibold">1000+</span> churches
          </div>
        </div>
      </div>
      <div class="image-carousel-ctn w-[95%] lg:w-[40%]">
        <div class="image-carousel flex gap-4 relative">
          <div
            :class="{
              'image-one': activeImage === 0,
              'image-two': activeImage === 1,
              'image-three': activeImage === 2,
            }"
            class="rounded-3xl border-4 border-purple-200 shadow-2xl h-[350px] min-w-[530px] object-cover transition-all"
          ></div>
          <div
            :class="{
              'image-two': activeImage === 0,
              'image-three': activeImage === 1,
              'image-one': activeImage === 2,
            }"
            class="rounded-3xl border-4 opacity-30 scale-95 border-purple-200 shadow-2xl h-[350px] min-w-[530px] object-cover transition-all"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeImage = ref(0)

onMounted(() => {
  setInterval(() => {
    activeImage.value = (activeImage.value + 1) % 3
  }, 2000)
})
</script>

<style scoped>
.image-one {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/song.webp")
    no-repeat;
  background-size: cover;
  background-position: center;
}
.image-two {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/text.webp")
    no-repeat;
  background-size: cover;
  background-position: center;
}
.image-three {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/bible.webp")
    no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
