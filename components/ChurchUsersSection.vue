<template>
  <div class="section church-users border-t border-gray-100">
    <div class="inner flex justify-between items-center py-[2%]">
      <template v-for="i in 4" :key="i">
        <img
          src="https://revaise.s3.us-east-2.amazonaws.com/website/rcf-unilag.webp"
          loading="lazy"
          alt="RCF Unilag Church"
          class="w-[28px] md:w-[40px] lg:w-[60px]"
        />
        <img
          src="https://revaise.s3.us-east-2.amazonaws.com/website/foursquare.webp"
          loading="lazy"
          alt="RCF Unilag Church"
          class="w-[28px] md:w-[40px] lg:w-[60px]"
        />
      </template>
    </div>
  </div>
</template>

<script setup></script>
