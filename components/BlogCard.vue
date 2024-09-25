<template>
  <nuxt-link
    :to="`/blog/${blog?._id?.replace('.md', '')?.replace('content:blog:', '')}`"
    class="blog-card group"
  >
    <div class="blog-card-image">
      <img :src="blog?.cover" alt="" class="w-full object-cover rounded-3xl" />
    </div>
    <div class="blog-card-content mt-6">
      <div class="flex tags gap-2 cursor-default mb-2">
        <div
          v-for="tag in topBlog?.tag.split(',')"
          :key="tag"
          class="tag uppercase px-2 py-1 rounded-full bg-gray-100 text-sm"
        >
          {{ tag.trim() }}
        </div>
      </div>
      <div class="blog-card-title">
        <h2 class="text-2xl font-bold group-hover:underline">
          {{ blog?.title }}
        </h2>
      </div>
      <div class="blog-card-description">
        <p class="text-md">{{ blog?.paragraph?.slice(0, 150) }}...</p>
      </div>
      <div class="blog-card-author mt-6 flex items-center gap-4">
        <img
          src="~/assets/images/favour.jpeg"
          alt=""
          class="rounded-full w-[40px] h-[40px] object-cover"
        />
        <span class="text-md font-semibold">{{ blog?.author }}</span>
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
