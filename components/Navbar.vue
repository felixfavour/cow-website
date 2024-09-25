<template>
  <div
    class="navbar section h-[60px] md:h-[85px] flex items-center bg-white sticky top-0 right-0 left-0 z-10"
  >
    <div class="inner flex justify-between items-center w-full xl:px-8">
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
        :class="
          isMenuOpen
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 translate-y-[100%]'
        "
        class="nav-actions transition-all duration-300 fixed inset-0 h-[100%] top-[60px] md:top-[85px] px-[7%] text-lg pt-[7.5%] bg-white lg:h-auto lg:px-0 lg:static lg:bg-transparent flex flex-col lg:pt-0 lg:flex-row lg:items-center gap-4 xl:gap-8 lg:text-sm font-medium"
      >
        <li class="nav-item">
          <nuxt-link to="/changelog" class="nav-link flex items-center gap-1">
            Changelog
          </nuxt-link>
        </li>
        <li class="nav-item group relative">
          <nuxt-link to="/features" class="nav-link flex items-center gap-1">
            Features <ArrowDown />
          </nuxt-link>
          <div
            class="ul-ctn pt-4 lg:hidden group-hover:block hover:block lg:absolute w-[100%] lg:w-[205px] z-10 left-[-80%] transition-all"
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
        <li class="nav-item">
          <nuxt-link to="/blog" class="nav-link"> Support </nuxt-link>
        </li>
        <ul class="auth flex flex-col lg:hidden">
          <li class="nav-item">
            <a
              href="https://github.com/felixfavour/minimalist-church-presentation-software"
              target="_blank"
              class="text-lg font-semibold gap-2 md:text-sm bg-gray-100 h-[45px] min-h-[50px] rounded-xl flex items-center justify-center hover:bg-purple-100 transition-all mb-3"
            >
              <GithubIcon class="w-8 h-8" />
              Open Source
            </a>
          </li>
          <li class="nav-item">
            <a
              href="https://app.cloudofworship.com/signup"
              class="primary-btn text-md md:text-sm min-h-[50px]"
            >
              Sign up for free
            </a>
          </li>
        </ul>
      </ul>
      <ul
        class="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg w-auto"
      >
        <li class="nav-item hidden lg:block">
          <a
            href="https://github.com/felixfavour/minimalist-church-presentation-software"
            target="_blank"
            class="text-xs md:text-sm bg-gray-100 w-[45px] h-[45px] rounded-xl grid place-items-center hover:bg-purple-100 transition-all"
          >
            <GithubIcon class="w-8 h-8" />
          </a>
        </li>
        <li class="nav-item hidden lg:block">
          <a
            href="https://app.cloudofworship.com/signup"
            class="primary-btn text-xs md:text-sm"
          >
            Sign up for free
          </a>
        </li>
        <li class="nav-item lg:hidden">
          <button
            class="menu-btn w-[45px] h-[45px] mt-1"
            @click="toggleMenu"
          ></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import lottie from "lottie-web"
const menuAnim = ref(null)
const isMenuOpen = ref(false)
const ariaText = ref("Open Navigation Menu")
const route = useRoute()

onMounted(() => {
  menuAnim.value = loadAnimation()
  if (window.innerWidth >= 1024) {
    isMenuOpen.value = true
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      isMenuOpen.value = true
    } else {
      isMenuOpen.value = false
    }
  })
})

const loadAnimation = () => {
  return lottie.loadAnimation({
    container: document.querySelector("button.menu-btn"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "/animation/hamburger.json",
    name: "Navigation Menu",
  })
}

const toggleMenu = () => {
  if (process.client && window.innerWidth < 1024) {
    if (!isMenuOpen.value) {
      menuAnim.value.playSegments([0, 17], true)
      ariaText.value = "Close Navigation Menu"
      isMenuOpen.value = true
      document.body.classList.add("modal-open")
    } else {
      menuAnim.value.playSegments([17, 0], true)
      ariaText.value = "Open Navigation Menu"
      isMenuOpen.value = false
      document.body.classList.remove("modal-open")
    }
  }
}

watch(
  () => route.path,
  () => {
    // Close menu on navigate
    if (isMenuOpen.value) {
      toggleMenu()
    }
    // Destory and reload animation on navigate
    if (process.client && lottie) {
      setTimeout(() => {
        lottie("Navigation Menu")
        menuAnim.value = this.loadAnimation()
      }, 1000)
    }
  }
)

const handleMenuClose = () => {
  menuAnim.value.playSegments([17, 0], true)
  ariaText.value = "Open Navigation Menu"
  isMenuOpen.value = false
  document.body.classList.remove("modal-open")
}
</script>

<style scoped>
.menu-open {
  visibility: visible;
}
.router-link-active {
  color: var(--primary-color);
  font-weight: 600;
}
</style>
