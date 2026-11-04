<template>
  <div
    class="navbar sticky top-0 inset-x-0 z-20 h-[60px] md:h-[76px] flex items-center transition-colors duration-300"
    :class="[barClass, { 'is-dark': isDark }]"
  >
    <div class="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 flex items-center">
      <a href="/" class="logo-ctn flex items-center shrink-0 lg:w-[232px]">
        <img
          :src="
            isDark
              ? '/logo/cloud-of-worship-all-white.png'
              : isPoster
                ? '/logo/cloud-of-worship-all-black.png'
                : '/logo/cow-logo-purple-and-black.png'
          "
          alt="Cloud of Worship"
          width="170"
          height="36"
          class="h-[36px] md:h-[44px] w-auto"
        />
      </a>
      <ul
        :class="[
          { 'is-open': isMenuOpen },
          isDark
            ? 'bg-[#101010] text-[#B7B7B7]'
            : isPoster
              ? 'bg-[#A855F7] text-[#0C0F19]'
              : 'bg-white text-gray-600',
        ]"
        :style="{ '--count': rowCount }"
        class="nav-actions fixed inset-0 top-[60px] md:top-[76px] overflow-y-auto px-5 md:px-10 pt-8 pb-10 text-lg flex flex-col gap-5 lg:static lg:overflow-visible lg:bg-transparent lg:p-0 lg:flex-row lg:items-center lg:gap-3 lg:text-[16px]"
      >
        <li v-for="item in rows" :key="item.label" class="nav-item relative">
          <a
            :href="item.href"
            class="nav-link top-link menu-row flex items-center transition-colors"
            :class="[linkClass(isActive(item.href, item.prefix)), { 'is-active': isActive(item.href, item.prefix) }]"
            :style="{ '--i': item.i }"
          >
            {{ item.label }}
            <!-- Opens out beside the label while its menu shows. -->
            <span v-if="item.children" class="chevron hidden lg:grid" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                <path d="M2 8l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
          <div v-if="item.children" class="menu pt-3 z-10" :style="{ '--i': item.i }">
            <ul class="menu-panel">
              <li v-for="child in item.children" :key="child.href">
                <a
                  :href="child.href"
                  class="nav-link menu-link menu-row block py-2 text-base transition-colors"
                  :class="[linkClass(isActive(child.href)), { 'is-active': isActive(child.href) }]"
                  :style="{ '--i': child.i }"
                >
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item menu-row lg:hidden pt-2" :style="{ '--i': rowCount - 1 }">
          <a :href="signupUrl" class="pill-btn w-full" :class="{ 'pill-btn-dark': isPoster }">Get started for free</a>
        </li>
      </ul>
      <div class="ml-auto flex items-center gap-3">
        <a
          href="https://github.com/CoW-Labs/cloudofworship"
          target="_blank"
          rel="noopener"
          aria-label="Cloud of Worship on GitHub"
          title="Cloud of Worship on GitHub"
          class="grid place-items-center w-[40px] h-[40px] mt-1 lg:mt-0 rounded-full transition-colors"
          :class="
            isDark
              ? 'text-white/80 hover:text-white hover:bg-white/10'
              : isPoster
                ? 'text-[#0C0F19] hover:bg-[#0C0F19]/10'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          "
        >
          <GithubIcon class="w-[26px] h-[26px]" aria-hidden="true" />
        </a>
        <!-- .pill-btn sets display itself, so the wrapper does the hiding -->
        <div class="hidden lg:block">
          <a :href="signupUrl" class="pill-btn" :class="{ 'pill-btn-dark': isPoster }">Get started for free</a>
        </div>
        <button
          class="menu-btn w-[45px] h-[45px] mt-1 lg:hidden"
          :class="{ invert: isDark, 'is-open': isMenuOpen }"
          :aria-label="ariaText"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { mergeUtmsIntoUrl } = useUtm()
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

// Every row of the mobile menu (main links, their sub links, then the button)
// gets a running index, which staggers its slide-in.
let rowIndex = 0
const rows = links.map((item) => ({
  ...item,
  i: rowIndex++,
  children: item.children?.map((child) => ({ ...child, i: rowIndex++ })),
}))
const rowCount = rowIndex + 1

// The home page opens on a dark hero, so the bar starts dark and see-through there.
// The home page sets this to "light" once its hero has scrolled under the
// light features section.
const navTheme = useState("navTheme", () => "dark")
const isDark = computed(() => route.path === "/" && navTheme.value !== "light")

// Pages that open on a brand-purple poster (the open source page). The bar
// starts see-through there, with ink links and the black logo. The route sets
// the starting state, so the server draws it the same way; the page then sets
// navPoster to true or false as its purple sections pass under the bar.
const POSTER_ROUTES = ["/open-source"]
const navPoster = useState("navPoster", () => null)
const isPoster = computed(
  () => !isDark.value && (navPoster.value ?? POSTER_ROUTES.includes(route.path))
)

const barClass = computed(() => {
  if (isPoster.value) {
    if (isMenuOpen.value && window.innerWidth < 1024) return "bg-[#A855F7]"
    return isScrolled.value ? "bg-[#A855F7]/85 backdrop-blur-md" : "bg-transparent"
  }
  if (!isDark.value) return "bg-white"
  if (isMenuOpen.value && window.innerWidth < 1024) return "bg-[#101010]"
  return isScrolled.value ? "bg-[#101010]/85 backdrop-blur-md" : "bg-transparent"
})

const linkClass = (active) => {
  if (isDark.value) return active ? "text-white" : "hover:text-white"
  if (isPoster.value) return active ? "text-[#0C0F19] font-semibold" : "text-[#0C0F19]"
  return active ? "text-[var(--primary-color)] font-semibold" : "hover:text-gray-900"
}

// Anchors don't get router-link-exact-active, so highlight the current section here.
const isActive = (path, prefix = false) =>
  prefix ? route.path.startsWith(path.replace(/\/[^/]+$/, "") || path) : route.path === path

const onScroll = () => (isScrolled.value = window.scrollY > 8)

onMounted(() => {
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

const toggleMenu = () => {
  if (process.client && window.innerWidth < 1024) {
    if (!isMenuOpen.value) {
      ariaText.value = "Close Navigation Menu"
      isMenuOpen.value = true
      document.body.classList.add("modal-open")
    } else {
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
/* Hamburger that folds into an X. Replaces a lottie animation, which put
   lottie-web (~250 KB) into the bundle every page loads. Lines are black;
   the dark home-page bar inverts the button, as it did the lottie SVG. */
.menu-icon {
  position: relative;
  display: block;
  width: 24px;
  height: 18px;
  margin: 0 auto;
}
.menu-icon > span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2.5px;
  border-radius: 2px;
  background: #000;
  transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.2s cubic-bezier(0.65, 0, 0.35, 1),
    top 0.35s cubic-bezier(0.65, 0, 0.35, 1);
}
.menu-icon > span:nth-child(1) { top: 0; }
.menu-icon > span:nth-child(2) { top: 7.75px; }
.menu-icon > span:nth-child(3) { top: 15.5px; }
.menu-btn.is-open .menu-icon > span:nth-child(1) { top: 7.75px; transform: rotate(45deg); }
.menu-btn.is-open .menu-icon > span:nth-child(2) { opacity: 0; }
.menu-btn.is-open .menu-icon > span:nth-child(3) { top: 7.75px; transform: rotate(-45deg); }
@media (prefers-reduced-motion: reduce) {
  .menu-icon > span { transition: none; }
}

/* Small screens: the menu is a full-screen sheet.
   Main links are large, bold and dark; sub links sit indented under a thin
   guide line, smaller and lighter, so the two levels read apart at a glance.
   On open the rows slide up into place one after another; on close they
   slide back down and the sheet fades, in reverse order and faster. */
@media (max-width: 1023px) {
  .nav-actions {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.12s, visibility 0s linear 0.42s;
  }
  .nav-actions.is-open {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s;
  }

  .menu-row {
    opacity: 0;
    transform: translateY(24px);
    /* Closing: drop down, last row first. */
    transition:
      transform 0.32s cubic-bezier(0.55, 0, 0.75, 0.06) calc((var(--count, 16) - var(--i, 0)) * 12ms),
      opacity 0.24s cubic-bezier(0.4, 0, 1, 1) calc((var(--count, 16) - var(--i, 0)) * 12ms),
      color 0.2s ease;
  }
  .nav-actions.is-open .menu-row {
    opacity: 1;
    transform: none;
    /* Opening: rise up, first row first, easing out to a soft stop. */
    transition:
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) calc(80ms + var(--i, 0) * 32ms),
      opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) calc(80ms + var(--i, 0) * 32ms),
      color 0.2s ease;
  }

  .top-link {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #111827;
  }
  .menu {
    margin: 4px 0 2px 3px;
    padding-top: 0;
    padding-left: 18px;
    border-left: 1.5px solid #e5e7eb;
  }
  /* The guide line draws down with its group instead of waiting, empty,
     for the rows to arrive. */
  .nav-actions .menu {
    border-left-color: transparent;
    transition: border-color 0.2s cubic-bezier(0.4, 0, 1, 1);
  }
  .nav-actions.is-open .menu {
    border-left-color: #e5e7eb;
    transition: border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1) calc(140ms + var(--i, 0) * 32ms);
  }
  .menu-link {
    font-size: 16px;
    font-weight: 400;
    color: #6b7280;
  }
  .top-link.is-active,
  .menu-link.is-active {
    color: #8a41c9;
  }

  /* The dark home-page sheet. */
  .is-dark .top-link {
    color: #ffffff;
  }
  .is-dark .nav-actions.is-open .menu {
    border-left-color: #2e2e2e;
  }
  .is-dark .menu-link {
    color: #8c8c8c;
  }
  .is-dark .top-link.is-active,
  .is-dark .menu-link.is-active {
    color: #c084fc;
  }
}
@media (max-width: 1023px) and (prefers-reduced-motion: reduce) {
  .menu-row,
  .nav-actions.is-open .menu-row {
    transform: none;
    transition: opacity 0.2s linear;
  }
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
