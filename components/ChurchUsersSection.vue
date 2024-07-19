<template>
  <div class="section church-users border-t border-gray-100">
    <div class="inner flex justify-between items-center py-[2%]">
      <template v-for="i in 4" :key="i">
        <img
          src="~/assets/images/rcf-unilag.png"
          alt="RCF Unilag Church"
          class="w-[28px] md:w-[40px] lg:w-[60px]"
        />
        <img
          src="~/assets/images/foursquare.png"
          alt="RCF Unilag Church"
          class="w-[28px] md:w-[40px] lg:w-[60px]"
        />
      </template>
    </div>
  </div>
</template>

<script setup></script>
