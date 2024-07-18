<template>
  <div
    class="navbar section h-[85px] flex items-center bg-white sticky top-0 right-0 left-0 z-10"
  >
    <div class="inner flex justify-between items-center">
      <div class="logo-ctn flex items-center gap-3 text-xl w-[250px]">
        <Logo />
        <h6 class="font-bold">Cloud of Worship</h6>
      </div>
      <ul class="nav-actions flex items-center gap-8 text-sm font-medium">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link"> Partner </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link flex items-center gap-1">
            Features <ArrowDown />
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link flex items-center gap-1">
            Resources <ArrowDown />
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link"> Wall of Love </nuxt-link>
        </li>
      </ul>
      <ul class="flex items-center gap-3 text-xl w-[250px]">
        <li class="nav-item">
          <a href="https://app.cloudofworship.com" class="ghost-btn text-sm">
            Sign in
          </a>
        </li>
        <li class="nav-item">
          <a href="https://app.cloudofworship.com" class="primary-btn text-sm">
            Sign up for free
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
