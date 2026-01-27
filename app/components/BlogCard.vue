<template>
  <nuxt-link :to="blog?.path" class="blog-card group">
    <div class="blog-card-image">
      <img
        :src="blog?.cover"
        alt=""
        class="w-full h-[220px] object-cover rounded-3xl"
      />
    </div>
    <div class="blog-card-content mt-6">
      <div class="flex tags gap-2 cursor-default mb-2">
        <div
          v-for="tag in blog?.tag?.split(',')"
          :key="tag"
          class="tag uppercase px-2 py-1 rounded-full bg-gray-100 text-xs md:text-sm"
        >
          {{ tag.trim() }}
        </div>
      </div>
      <div class="blog-card-title">
        <h2
          class="text-xl leading-[115%] md:text-2xl font-bold group-hover:underline mb-2"
        >
          {{ blog?.title }}
        </h2>
      </div>
      <div class="blog-card-description">
        <p class="text-md">{{ blog?.paragraph?.slice(0, 150) }}...</p>
      </div>
      <div class="flex items-center justify-between mt-6">
        <div class="blog-card-author flex items-center gap-4">
          <img
            :src="blog?.author_img || '/images/author/favour.jpeg'"
            alt=""
            class="rounded-full w-[40px] h-[40px] object-cover"
          />
          <span class="text-md font-semibold">{{ blog?.author }}</span>
        </div>
        <ArrowDown class="w-5 h-5 md:w-6 md:h-6 -rotate-90" />
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  blog: Object,
})
</script>

<style scoped></style>
