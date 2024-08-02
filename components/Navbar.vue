<template>
  <div
    class="navbar section h-[60px] md:h-[85px] flex items-center bg-white sticky top-0 right-0 left-0 z-10"
  >
    <div class="inner flex justify-between items-center w-full md:px-4 lg:px-8">
      <nuxt-link
        to="/"
        class="logo-ctn flex items-center gap-3 text-xl w-[250px]"
      >
        <Logo class="w-[32px] md:w-auto" />
        <h6 class="font-bold text-base md:text-lg lg:text-xl whitespace-nowrap">
          Cloud of Worship
        </h6>
      </nuxt-link>
      <ul
        class="nav-actions hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm font-medium"
      >
        <li class="nav-item">
          <nuxt-link to="/changelog" class="nav-link flex items-center gap-1">
            Changelog
          </nuxt-link>
        </li>
        <li class="nav-item group relative">
          <nuxt-link to="#" class="nav-link flex items-center gap-1">
            Features <ArrowDown />
          </nuxt-link>
          <div
            class="ul-ctn pt-4 hidden group-hover:block hover:block absolute w-[200px] z-10 left-[-80%] transition-all"
          >
            <ul
              class="link-dropdown p-2 border border-gray-100 rounded-lg shadow-lg transition-all bg-white"
            >
              <li>
                <nuxt-link
                  to="/features/browser-ready"
                  class="nav-link flex items-center gap-1 p-3 hover:bg-purple-100 transition rounded-lg"
                >
                  Browser-ready UX
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/features/offline-first"
                  class="nav-link flex items-center gap-1 p-3 hover:bg-purple-100 transition rounded-lg"
                >
                  Offline-first experience
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/features/team-workflow"
                  class="nav-link flex items-center gap-1 p-3 hover:bg-purple-100 transition rounded-lg"
                >
                  Team Workflow
                </nuxt-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <nuxt-link to="/pricing" class="nav-link"> Pricing </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/wall-of-love" class="nav-link">
            Wall of Love
          </nuxt-link>
        </li>
      </ul>
      <ul
        class="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg w-auto"
      >
        <!-- <li class="nav-item">
          <button></button>
        </li> -->
        <li class="nav-item hidden md:block">
          <a
            href="https://app.cloudofworship.com"
            class="ghost-btn text-xs md:text-sm"
          >
            Sign in
          </a>
        </li>
        <li class="nav-item hidden md:block">
          <a
            href="https://app.cloudofworship.com/signup"
            class="primary-btn text-xs md:text-sm"
          >
            Sign up for free
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
