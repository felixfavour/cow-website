<template>
  <div
    class="navbar sticky top-0 inset-x-0 z-20 h-[60px] md:h-[76px] flex items-center transition-colors duration-300"
    :class="barClass"
  >
    <div class="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 flex items-center">
      <a href="/" class="logo-ctn flex items-center shrink-0 lg:w-[232px]">
        <img
          :src="isDark ? '/logo/cloud-of-worship-all-white.png' : '/logo/cow-logo-purple-and-black.png'"
          alt="Cloud of Worship"
          width="170"
          height="36"
          class="h-[30px] md:h-[36px] w-auto"
        />
      </a>
      <ul
        :class="[
          isMenuOpen ? 'visible' : 'invisible lg:visible',
          isDark ? 'bg-[#101010] text-[#B7B7B7]' : 'bg-white text-gray-600',
        ]"
        class="nav-actions fixed inset-0 top-[60px] md:top-[76px] overflow-y-auto px-5 md:px-10 pt-8 pb-10 text-lg flex flex-col gap-5 lg:static lg:overflow-visible lg:bg-transparent lg:p-0 lg:flex-row lg:items-center lg:gap-[28px] lg:text-[16px]"
      >
        <li v-for="item in links" :key="item.label" class="nav-item group relative">
          <a
            :href="item.href"
            class="nav-link flex items-center gap-1 transition-colors"
            :class="linkClass(isActive(item.href, item.prefix))"
          >
            {{ item.label }}
          </a>
          <div
            v-if="item.children"
            class="pt-3 lg:hidden lg:group-hover:block lg:group-focus-within:block lg:absolute lg:-left-3 lg:w-[240px] z-10"
          >
            <ul
              class="link-dropdown lg:p-2 lg:rounded-xl lg:border lg:shadow-xl"
              :class="isDark ? 'lg:bg-[#181818] lg:border-white/10' : 'lg:bg-white lg:border-gray-100'"
            >
              <li v-for="child in item.children" :key="child.href">
                <a
                  :href="child.href"
                  class="nav-link block py-2 lg:p-3 rounded-lg text-base lg:text-[15px] transition-colors"
                  :class="[
                    linkClass(isActive(child.href)),
                    isDark ? 'lg:hover:bg-white/5' : 'lg:hover:bg-purple-100',
                  ]"
                >
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item lg:hidden pt-2">
          <a :href="signupUrl" class="pill-btn w-full">Get started for free</a>
        </li>
      </ul>
      <div class="ml-auto flex items-center gap-3">
        <!-- .pill-btn sets display itself, so the wrapper does the hiding -->
        <div class="hidden lg:block">
          <a :href="signupUrl" class="pill-btn">Get started for free</a>
        </div>
        <button
          class="menu-btn w-[45px] h-[45px] mt-1 lg:hidden"
          :class="{ invert: isDark }"
          :aria-label="ariaText"
          @click="toggleMenu"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import lottie from "lottie-web"
const { mergeUtmsIntoUrl } = useUtm()
const menuAnim = ref(null)
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const ariaText = ref("Open Navigation Menu")
const route = useRoute()

const signupUrl = computed(() =>
  mergeUtmsIntoUrl(
    "https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=navbar"
  )
)

const links = [
  {
    label: "Products",
    href: "/features/browser-ready",
    prefix: true,
    children: [
      { label: "Browser-ready UX", href: "/features/browser-ready" },
      { label: "Offline-first experience", href: "/features/offline-first" },
      { label: "Team Workflow", href: "/features/team-workflow" },
      { label: "Bible & scripture", href: "/features/bible-verses" },
      { label: "Songs & hymns", href: "/features/song-lyrics" },
      { label: "Live projection", href: "/features/live-projection" },
      { label: "Live transcription", href: "/features/live-transcription" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/docs",
    prefix: true,
    children: [
      { label: "Help Center", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Wall of Love", href: "/wall-of-love" },
    ],
  },
  { label: "Download", href: "/download" },
]

// The home page opens on a dark hero, so the bar starts dark and see-through there.
// The home page sets this to "light" once its hero has scrolled under the
// light features section.
const navTheme = useState("navTheme", () => "dark")
const isDark = computed(() => route.path === "/" && navTheme.value !== "light")

const barClass = computed(() => {
  if (!isDark.value) return "bg-white"
  if (isMenuOpen.value && window.innerWidth < 1024) return "bg-[#101010]"
  return isScrolled.value ? "bg-[#101010]/85 backdrop-blur-md" : "bg-transparent"
})

const linkClass = (active) => {
  if (isDark.value) return active ? "text-white" : "hover:text-white"
  return active ? "text-[var(--primary-color)] font-semibold" : "hover:text-gray-900"
}

// Anchors don't get router-link-exact-active, so highlight the current section here.
const isActive = (path, prefix = false) =>
  prefix ? route.path.startsWith(path.replace(/\/[^/]+$/, "") || path) : route.path === path

const onScroll = () => (isScrolled.value = window.scrollY > 8)

onMounted(() => {
  menuAnim.value = loadAnimation()
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })
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

onBeforeUnmount(() => window.removeEventListener("scroll", onScroll))

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
    if (isMenuOpen.value && window.innerWidth < 1024) {
      toggleMenu()
    }
  }
)
</script>

<style scoped>
.menu-open {
  visibility: visible;
}
</style>
