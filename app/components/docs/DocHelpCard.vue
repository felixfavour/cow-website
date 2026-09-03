<template>
  <div class="p-5 md:p-6 rounded-2xl bg-[#FFE9E8]/70 border border-[#FFD3CF] flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
    <div>
      <p class="font-bold text-gray-800 mb-0.5">Still need help?</p>
      <p class="text-sm text-gray-600">Our team is happy to answer your questions, and the community is always online.</p>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <NuxtLink
        to="/contact"
        class="inline-flex items-center gap-2 px-4 h-[42px] rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
      >
        Contact support
      </NuxtLink>
      <a
        href="https://chat.whatsapp.com/DeQX11igCSU6YaOoTqY7GY"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 px-4 h-[42px] rounded-xl bg-white text-gray-800 text-sm font-semibold border border-gray-200 hover:border-purple-300 hover:text-purple-700 transition-colors"
      >
        Join community
      </a>
    </div>
  </div>
</template>
