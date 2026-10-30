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
        class="nav-actions fixed inset-0 top-[60px] md:top-[76px] overflow-y-auto px-5 md:px-10 pt-8 pb-10 text-lg flex flex-col gap-5 lg:static lg:overflow-visible lg:bg-transparent lg:p-0 lg:flex-row lg:items-center lg:gap-3 lg:text-[16px]"
      >
        <li v-for="item in links" :key="item.label" class="nav-item relative">
          <a
            :href="item.href"
            class="nav-link top-link flex items-center transition-colors"
            :class="linkClass(isActive(item.href, item.prefix))"
          >
            {{ item.label }}
            <!-- Opens out beside the label while its menu shows. -->
            <span v-if="item.children" class="chevron hidden lg:grid" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                <path d="M2 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
          <div v-if="item.children" class="menu pt-3 z-10">
            <ul class="menu-panel">
              <li v-for="child in item.children" :key="child.href">
                <a
                  :href="child.href"
                  class="nav-link menu-link block py-2 text-base transition-colors"
                  :class="[linkClass(isActive(child.href)), { 'is-active': isActive(child.href) }]"
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
      { label: "Help center", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Wall of love", href: "/wall-of-love" },
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

/* Wide screens: the link under the pointer sits in a pale lilac pill, and its
   menu drops just below in a lilac panel that deepens towards the corner. */
@media (min-width: 1024px) {
  .top-link {
    height: 39px;
    padding: 0 14px;
    border-radius: 9999px;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .nav-item:hover > .top-link,
  .nav-item:focus-within > .top-link {
    background: #f3eafb;
    color: #1a1f2e;
  }
  .chevron {
    width: 0;
    margin-left: 0;
    opacity: 0;
    overflow: hidden;
    transition: width 0.25s ease, margin 0.25s ease, opacity 0.2s ease;
  }
  .chevron svg {
    flex: none;
  }
  .nav-item:hover .chevron,
  .nav-item:focus-within .chevron {
    width: 12px;
    margin-left: 6px;
    opacity: 1;
  }

  /* The 4px gap above the panel is part of it, so the pointer can cross. */
  .menu {
    position: absolute;
    top: 100%;
    left: -25px;
    padding-top: 4px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px);
    transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1), visibility 0s linear 0.25s;
  }
  .nav-item:hover > .menu,
  .nav-item:focus-within > .menu {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 0s;
  }
  /* Grows to the longest label so none wraps out of its 32px row. */
  .menu-panel {
    width: max-content;
    min-width: 224px;
    padding: 24px 0;
    border-radius: 22px;
    background:
      radial-gradient(120% 90% at 100% 100%, #d9c0ee 0%, rgba(217, 192, 238, 0) 60%),
      #f3eafb;
    box-shadow: 0 18px 40px -18px rgba(26, 31, 46, 0.35);
  }
  /* Each item gets its own pill under the pointer, like the top links; the
     text stays 28px in from the panel's edge. */
  .menu-link {
    height: 32px;
    margin: 0 12px;
    padding: 0 16px;
    border-radius: 9999px;
    line-height: 32px;
    font-size: 16px;
    white-space: nowrap;
    color: #1a1f2e;
    outline: none;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .menu-link:hover,
  .menu-link:focus-visible {
    background: rgba(138, 65, 201, 0.12);
    color: #1a1f2e;
  }
  .menu-link.is-active {
    color: #8a41c9;
  }
}
</style>
