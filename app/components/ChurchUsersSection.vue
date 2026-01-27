<template>
  <div
    ref="scrollContainer"
    class="section church-users border-t border-gray-100 scroll-ctn whitespace-nowrap overflow-hidden relative"
  >
    <div
      ref="scrollContent"
      class="inner flex gap-[7.5%] justify-between items-center py-3 md:py-[2%]"
    >
      <template v-for="i in 50" :key="i">
        <img
          src="https://revaise.s3.us-east-2.amazonaws.com/website/rcf-unilag.webp"
          loading="lazy"
          alt="RCF Unilag Church"
          class="w-[40px] lg:w-[60px]"
        />
        <img
          src="https://revaise.s3.us-east-2.amazonaws.com/website/foursquare.webp"
          loading="lazy"
          alt="Foursquare Gospel Church in Nigeria"
          class="w-[50px] lg:w-[70px]"
        />
        <img
          src="~/assets/images/rccg.webp"
          loading="lazy"
          alt="Redeemed Christian Church of God"
          class="w-[40px] lg:w-[60px]"
        />
        <img
          src="~/assets/images/elevation-church.webp"
          loading="lazy"
          alt="The Elevation Church"
          class="w-[80px] lg:w-[130px]"
        />
        <img
          src="~/assets/images/cac.webp"
          loading="lazy"
          alt="Christ Apostolic Church"
          class="w-[40px] lg:w-[60px]"
        />
        <img
          src="~/assets/images/anglican.webp"
          loading="lazy"
          alt="Anglican Church of Nigeria"
          class="w-[80px] lg:w-[130px]"
        />
        <img
          src="~/assets/images/gofamint.webp"
          loading="lazy"
          alt="Gospel Faith Mission International (Gofamint)"
          class="w-[40px] lg:w-[60px]"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
const scrollContainer = ref(null)
const scrollContent = ref(null)

onMounted(() => {
  scrollHorizontally()
})

let scrollAmount = 1 // Speed of the scroll
function scrollHorizontally() {
  if (scrollContainer.value === null || scrollContent.value === null) {
    return
  }
  scrollContainer.value.scrollLeft += scrollAmount
  // If we've scrolled to the end, reset to start
  if (scrollContainer.value.scrollLeft >= scrollContent.value.scrollWidth / 2) {
    scrollContainer.value.scrollLeft = 0
  }
  requestAnimationFrame(scrollHorizontally)
}
</script>
