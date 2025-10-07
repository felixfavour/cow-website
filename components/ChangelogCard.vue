<template>
  <div class="section border-t border-gray-100 py-8">
    <div
      class="changelog-card inner smaller-inner flex flex-col gap-4 lg:flex-row"
    >
      <div class="col w-[100%] lg:w-[35%]">
        <h6 class="font-normal pt-1">
          <span class="font-bold text-purple-500">{{ version }},</span>
          {{ date }}
        </h6>
      </div>
      <div class="col">
        <div class="header flex flex-row gap-4 items-center">
          <h4 class="text-xl lg:text-2xl font-bold">{{ title }}</h4>
          <div
            v-if="latest"
            class="bg-purple-800 text-white p-1 px-3 rounded-2xl"
          >
            Latest
          </div>
        </div>
        <!-- <img
          :src="image"
          :alt="`Image showing ${description}, Cloud of Worship.`"
          loading="lazy"
          class="w-[100%] border-4 lg:border-8 border-gray-100 rounded-xl my-[3%]"
        /> -->
        <ul class="list-disc ml-4 text-md leading-8 max-w-[600px]">
          <li
            v-for="change in changesReformed"
            :key="change"
            class="capitalize"
          >
            {{ change }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  version: String,
  image: String,
  title: String,
  description: String,
  changes: [],
  date: String,
  latest: Boolean,
})

const changesReformed = props.changes.filter((change) => {
  return !(
    change?.includes("Merge branch ") ||
    change?.includes("Merge pull request ") ||
    change?.trim() === ""
  )
})
</script>
