<template>
  <div class="section church-users border-t border-gray-100 overflow-hidden relative">
    <!-- Two identical copies slide left by one copy's width, so the loop is
         seamless. This used to be 50 copies (450 images) scrolled by a
         requestAnimationFrame loop that forced a layout every frame, on every
         page that shows the strip. -->
    <div class="marquee-track flex w-max py-3 md:py-[2%]">
      <div
        v-for="copy in 2"
        :key="copy"
        class="marquee-copy flex shrink-0 items-center justify-around gap-10 lg:gap-20 pr-10 lg:pr-20 min-w-[100vw]"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <img
          v-for="logo in logos"
          :key="logo.alt"
          :src="logo.src"
          :alt="copy === 1 ? logo.alt : ''"
          :class="logo.class"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import rccg from "~/assets/images/rccg.webp"
import elevation from "~/assets/images/elevation-church.webp"
import cac from "~/assets/images/cac.webp"
import anglican from "~/assets/images/anglican.webp"
import gofamint from "~/assets/images/gofamint.webp"
import celebration from "~/assets/images/celebration-church.webp"
import lightNation from "~/assets/images/light-nation-church.webp"

const small = "w-[40px] lg:w-[60px]"
const wide = "w-[80px] lg:w-[130px]"

const logos = [
  { src: "https://revaise.s3.us-east-2.amazonaws.com/website/rcf-unilag.webp", alt: "RCF Unilag Church", class: small },
  { src: "https://revaise.s3.us-east-2.amazonaws.com/website/foursquare.webp", alt: "Foursquare Gospel Church in Nigeria", class: "w-[50px] lg:w-[70px]" },
  { src: rccg, alt: "Redeemed Christian Church of God", class: small },
  { src: elevation, alt: "The Elevation Church", class: wide },
  { src: cac, alt: "Christ Apostolic Church", class: small },
  { src: anglican, alt: "Anglican Church of Nigeria", class: wide },
  { src: gofamint, alt: "Gospel Faith Mission International (Gofamint)", class: small },
  { src: celebration, alt: "Celebration Church International", class: small },
  { src: lightNation, alt: "The Light Nation Church", class: small },
]
</script>

<style scoped>
.marquee-track {
  animation: church-marquee 40s linear infinite;
  will-change: transform;
}
@keyframes church-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
