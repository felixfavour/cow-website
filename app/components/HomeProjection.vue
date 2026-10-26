<template>
  <!-- Above the features section, so cursors flying up out of it pass over it. -->
  <section ref="section" class="home-projection relative z-[2] bg-white pt-28 pb-24 xl:pt-[190px] xl:pb-[173px]">
    <!-- 780px of text width gives the design's five lines. -->
    <div class="mx-auto max-w-[820px] px-5">
      <div class="relative">
        <RevealText
          as="h2"
          :lines="[copy]"
          scrub
          :range="[0.82, 0.28]"
          class="projection-copy text-center font-bold text-[#1A1F2E]"
        />

        <!-- Where each cursor rests. They show once all three have landed. -->
        <div
          v-for="(cursor, i) in cursors"
          :key="cursor.name"
          ref="anchors"
          class="anchor absolute"
          :class="[cursor.place, { landed: landed && !docking }]"
          aria-hidden="true"
        >
          <div class="drift" :style="{ animationDelay: `${-i * 1.7}s`, animationDuration: `${6 + i * 1.3}s` }">
            <CursorTag
              :name="cursor.name"
              :width="cursor.width"
              :background="cursor.color"
              :text-color="cursor.textColor"
            />
          </div>
        </div>
      </div>
    </div>

    <!--
      The same cursors in flight. They live in the page, not in a fixed layer,
      so the page's own scrolling carries them; only their progress along the
      path is animated.
    -->
    <div class="flight absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        v-for="cursor in cursors"
        :key="cursor.name"
        ref="flyers"
        class="flyer absolute left-0 top-0"
      >
        <CursorTag
          :name="cursor.name"
          :width="cursor.width"
          :background="cursor.color"
          :text-color="cursor.textColor"
        />
      </div>
    </div>

    <!--
      Further down the page the cursors leave the text and dock in the
      bottom-right corner of the screen, where they stay for the sections
      below. Docked, they must hold still while the page scrolls under them,
      so this layer is fixed to the screen.
    -->
    <Teleport to="body">
      <div v-if="mounted" ref="dock" class="dock fixed inset-0 pointer-events-none z-[15]" aria-hidden="true">
        <div
          v-for="(cursor, i) in cursors"
          :key="cursor.name"
          ref="dockers"
          class="docker absolute left-0 top-0"
        >
          <div class="drift" :style="{ animationDelay: `${-i * 1.7}s`, animationDuration: `${6 + i * 1.3}s` }">
            <CursorTag
              :name="cursor.name"
              :width="cursor.width"
              :background="cursor.color"
              :text-color="cursor.textColor"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
// "Screen projection": a big statement that writes itself in as you scroll,
// with three collaborators' cursors around it. The cursors come out of the
// "L" avatar in the features window above: as this section scrolls in, each
// one pops out of the avatar, grows into its name pill, picks up its colour
// and pointer, and flies down to its place here. Scrolling back sends them
// home. Once the text has been read, they set off again and dock together in
// the bottom-right corner of the screen, and when the photo below shrinks into
// its box they fly into their avatars beside it, shrinking into the circles. Progress eases towards the scroll position
// rather than jumping with it, so both flights stay fluid even with a stepped
// mouse wheel.

const copy =
  "Your service should not depend on one person who knows how to use the software. Cloud of Worship takes care of your screen projection right from your browser. We rethought screen projection from the ground up, and made it feel communal."

const cursors = [
  { name: "Lanre O.", color: "#528BFF", textColor: "#F8F9FB", width: 114, place: "lanre" },
  { name: "Inioluwa", color: "#F3C677", textColor: "#1A1F2E", width: 126, place: "inioluwa" },
  { name: "Favour", color: "#BD7AEA", textColor: "#F8F9FB", width: 126, place: "favour" },
]
const PILL_HEIGHT = 52

// The flight runs while this section's top rises from the bottom of the
// screen to 30% of the way down it. Each cursor leaves a little after the one
// before.
const FLIGHT_SPAN = 0.7
const STAGGER = 0.12
// Share of each cursor's flight spent popping out of the avatar before it moves.
const POP = 0.08
// Seconds for the flight to catch up with the scroll position.
const SMOOTHING = 0.16

// The second flight, to the corner, runs while this section's top moves from
// 5% of the way down the screen to 45% above it.
const DOCK_START = 0.05
const DOCK_SPAN = 0.5
// Docked, the cursors shrink a little and sit in a loose stack, measured to
// each pill's centre from the screen's bottom-right corner (at full size; the
// gaps shrink with the cursors on phones).
const DOCK_SCALE = 0.8
const DOCK_SCALE_NARROW = 0.68
// The last flight, into the avatars, runs over this share of the photo
// section's shrink (HomeFamiliar publishes it as "familiarShrink").
const HOME_START = 0.4
const HOME_SPAN = 0.5
const DOCK_PLACES = [
  { right: 150, bottom: 100 }, // Lanre O.
  { right: 40, bottom: 150 }, // Inioluwa
  { right: 40, bottom: 50 }, // Favour
]

const section = ref(null)
const anchors = ref([])
const flyers = ref([])
const landed = ref(false)
const docking = ref(false)
const mounted = ref(false)
const dock = ref(null)
const dockers = ref([])

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const rgb = (colour) =>
  colour.startsWith("#") ? [1, 3, 5].map((i) => parseInt(colour.slice(i, i + 2), 16)) : colour.match(/\d+/g).map(Number)
const mixColour = (a, b, t) => {
  const [ra, ga, ba] = rgb(a)
  const [rb, gb, bb] = rgb(b)
  return `rgb(${Math.round(lerp(ra, rb, t))},${Math.round(lerp(ga, gb, t))},${Math.round(lerp(ba, bb, t))})`
}

let source = null
let sourceColour = "#1f2e50"
let target = 0
let current = 0
let dockTarget = 0
let dockCurrent = 0
let homeTarget = 0
let homeCurrent = 0
let homes = []
const familiarShrink = useState("familiarShrink", () => 0)
let frame = 0
let lastTime = 0
let reducedMotion = false

const findSource = () => {
  source = document.querySelector("[data-cursor-source]")
  if (source) sourceColour = getComputedStyle(source).getPropertyValue("--avatar").trim() || sourceColour
}

const measure = () => {
  if (!section.value) return
  const vh = window.innerHeight
  const top = section.value.getBoundingClientRect().top
  target = clamp01((vh - top) / (FLIGHT_SPAN * vh))
  dockTarget = clamp01((DOCK_START * vh - top) / (DOCK_SPAN * vh))

  // Fade the docked cursors out as the footer comes up, so they never sit
  // over its links.
  const footer = document.querySelector("footer.footer")
  if (dock.value && footer) {
    const fade = clamp01((footer.getBoundingClientRect().top - vh * 0.55) / (vh * 0.3))
    dock.value.style.opacity = fade.toFixed(3)
  }
}

const readHomeTarget = () => {
  homeTarget = clamp01((familiarShrink.value - HOME_START) / HOME_SPAN)
}

const findHomes = () => {
  const byName = new Map([...document.querySelectorAll("[data-cursor-home]")].map((el) => [el.dataset.cursorHome, el]))
  homes = cursors.map((cursor) => byName.get(cursor.name) || null)
}

const setArrived = (i, arrived) => {
  const home = homes[i]
  if (home && home.dataset.arrived !== String(arrived)) home.dataset.arrived = String(arrived)
}

// Each frame first measures everything it needs and only then moves things:
// measuring after a move makes the browser redo the page's layout there and
// then, and doing that a few times a frame is what makes an animation stutter.

// Only touch a style when it changes.
const put = (style, prop, value) => {
  if (style[prop] !== value) style[prop] = value
}

// Lay the docking cursors out for progress d (to the corner) and h (on into
// the avatars), in screen coordinates. Measures now; returns the moves.
const layOutDock = (d, h) => {
  if (homes.length !== cursors.length || (homes[0] && !homes[0].isConnected)) findHomes()
  if (!d || !dock.value) {
    return () => {
      docking.value = d > 0
      dockers.value.forEach((el) => put(el.style, "visibility", "hidden"))
      cursors.forEach((_, i) => setArrived(i, false))
    }
  }
  // Measured against the layer itself, so nothing that shifts fixed
  // elements (a dev sidebar, a transformed ancestor) can throw them off.
  const layer = dock.value.getBoundingClientRect()
  const vw = layer.width || document.documentElement.clientWidth
  const vh = layer.height || window.innerHeight
  const scale = vw < 768 ? DOCK_SCALE_NARROW : DOCK_SCALE
  const spread = scale / DOCK_SCALE

  const moves = cursors.map((cursor, i) => {
    const el = dockers.value[i]
    const t = clamp01((d - i * STAGGER) / (1 - (cursors.length - 1) * STAGGER))
    const e = easeInOut(t)
    // From where it rests by the text (its drift is shared with this copy)...
    const rest = anchors.value[i].getBoundingClientRect()
    const fx = rest.left + rest.width / 2 - layer.left
    const fy = rest.top + rest.height / 2 - layer.top
    // ...to its place in the corner.
    const place = DOCK_PLACES[i]
    const tx = vw - place.right * spread - (cursor.width * scale) / 2
    const ty = vh - place.bottom * spread
    const k = lerp(1, scale, e)
    let cx = lerp(fx, tx, e)
    let cy = lerp(fy, ty, e)
    let w = cursor.width
    let hgt = PILL_HEIGHT
    let label = 1
    let arrow = 1
    let background = cursor.color

    // Home: into its avatar, shrinking into the circle as the name and
    // pointer fade.
    const home = homes[i]
    const th = home ? clamp01((h - i * STAGGER) / (1 - (cursors.length - 1) * STAGGER)) : 0
    if (th > 0) {
      const eh = easeInOut(th)
      const a = home.getBoundingClientRect()
      // Cancel the drift on the way in so it lands exactly on the circle.
      const box = el.getBoundingClientRect()
      const drift = el.firstElementChild.getBoundingClientRect()
      cx = lerp(cx, a.left + a.width / 2 - layer.left, eh) - (drift.left - box.left) * eh
      cy = lerp(cy, a.top + a.height / 2 - layer.top, eh) - (drift.top - box.top) * eh
      w = lerp(cursor.width, a.width / k, eh)
      hgt = lerp(PILL_HEIGHT, a.height / k, eh)
      label = 1 - smooth(0, 0.45, th)
      arrow = 1 - smooth(0, 0.35, th)
      background = mixColour(cursor.color, getComputedStyle(home).backgroundColor, eh)
    }

    // Scaled from its top-left corner, so centre it on its scaled size.
    const x = cx - (w * k) / 2
    const y = cy - (hgt * k) / 2
    return () => {
      setArrived(i, th >= 1)
      put(el.style, "visibility", th >= 1 ? "hidden" : "visible")
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${k.toFixed(3)})`
      const tag = el.querySelector(".cursor-tag")
      tag.style.width = `${w.toFixed(1)}px`
      tag.style.height = `${hgt.toFixed(1)}px`
      const pill = tag.firstElementChild
      pill.style.borderRadius = `${(hgt / 2).toFixed(1)}px`
      pill.style.background = background
      pill.firstElementChild.style.opacity = label.toFixed(3)
      const pointer = tag.lastElementChild
      pointer.style.opacity = arrow.toFixed(3)
      pointer.style.transform = `scale(${(0.6 + 0.4 * arrow).toFixed(3)})`
    }
  })
  return () => {
    docking.value = true
    moves.forEach((move) => move())
  }
}

// Lay the flyers out for progress q, in this section's own coordinates.
// Measures now; returns the moves.
const layOutFlight = (q, docked) => {
  const flying = q > 0 && q < 1 && !docked && source?.isConnected
  if (!flying) {
    return () => {
      landed.value = q >= 1
      flyers.value.forEach((el) => put(el.style, "visibility", "hidden"))
    }
  }

  const origin = section.value.getBoundingClientRect()
  const avatar = source.getBoundingClientRect()
  const ax = avatar.left + avatar.width / 2 - origin.left
  const ay = avatar.top + avatar.height / 2 - origin.top
  const size = Math.max(avatar.width, 8)

  const moves = cursors.map((cursor, i) => {
    const el = flyers.value[i]
    const t = clamp01((q - i * STAGGER) / (1 - (cursors.length - 1) * STAGGER))
    // Land on the resting cursor where its drift has it right now.
    const rest = anchors.value[i].firstElementChild.getBoundingClientRect()
    const tx = rest.left + rest.width / 2 - origin.left
    const ty = rest.top + rest.height / 2 - origin.top

    // It pops out on top of the avatar first, then sets off.
    const pop = smooth(0, POP, t)
    const travel = clamp01((t - POP) / (1 - POP))
    const grow = smooth(POP, 0.5, t)
    const w = lerp(size, cursor.width, grow)
    const h = lerp(size, PILL_HEIGHT, grow)
    // Across eases in and out while down eases out, so the path arcs.
    const x = lerp(ax, tx, easeInOut(travel)) - w / 2
    const y = lerp(ay, ty, easeOut(travel)) - h / 2
    const a = smooth(0.6, 0.95, t)

    return () => {
      const tag = el.firstElementChild
      put(el.style, "visibility", t > 0 ? "visible" : "hidden")
      el.style.opacity = pop.toFixed(3)
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(0.5 + 0.5 * pop).toFixed(3)})`
      tag.style.width = `${w.toFixed(1)}px`
      tag.style.height = `${h.toFixed(1)}px`
      const pill = tag.firstElementChild
      pill.style.borderRadius = `${(h / 2).toFixed(1)}px`
      pill.style.background = mixColour(sourceColour, cursor.color, smooth(0.04, 0.5, t))
      pill.firstElementChild.style.opacity = smooth(0.55, 0.9, t).toFixed(3)
      const arrow = tag.lastElementChild
      arrow.style.opacity = a.toFixed(3)
      arrow.style.transform = `scale(${(0.6 + 0.4 * a).toFixed(3)})`
    }
  })
  return () => {
    landed.value = false
    moves.forEach((move) => move())
  }
}

const draw = () => {
  const moveDockers = layOutDock(dockCurrent, homeCurrent)
  const moveFlyers = layOutFlight(current, dockCurrent > 0)
  moveDockers()
  moveFlyers()
}

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  const k = 1 - Math.exp(-dt / SMOOTHING)
  current += (target - current) * k
  dockCurrent += (dockTarget - dockCurrent) * k
  readHomeTarget()
  homeCurrent += (homeTarget - homeCurrent) * k
  if (Math.abs(target - current) < 0.0005) current = target
  if (Math.abs(dockTarget - dockCurrent) < 0.0005) dockCurrent = dockTarget
  if (Math.abs(homeTarget - homeCurrent) < 0.0005) homeCurrent = homeTarget
  draw()
  const settled = current === target && dockCurrent === dockTarget && homeCurrent === homeTarget
  frame = settled ? 0 : requestAnimationFrame(tick)
  if (!frame) lastTime = 0
}

const onScroll = () => {
  measure()
  if (reducedMotion || !source) {
    readHomeTarget()
    current = target
    dockCurrent = dockTarget
    homeCurrent = homeTarget
    draw()
    return
  }
  if (!frame) frame = requestAnimationFrame(tick)
}

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  mounted.value = true
  nextTick(() => {
    findSource()
    // Arriving part-way down the page shouldn't play the flights from the start.
    measure()
    readHomeTarget()
    current = target
    dockCurrent = dockTarget
    homeCurrent = homeTarget
    draw()
  })
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  docking.value = false
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
})
</script>

<style scoped>
/* 47px on a 46px line at full size, as in the design. */
.projection-copy {
  font-size: clamp(30px, 4.6vw, 47px);
  line-height: 0.98;
}

.anchor {
  opacity: 0;
}
.anchor.landed {
  opacity: 1;
}

.flyer,
.docker {
  visibility: hidden;
  will-change: transform;
  contain: layout style;
}
.docker {
  transform-origin: 0 0;
}
.dock {
  transition: opacity 0.25s ease;
}

/* Below 1280px the cursors tuck in above and below the text. */
.lanre {
  left: 0;
  top: -84px;
}
.inioluwa {
  right: 0;
  top: -84px;
}
.favour {
  right: 12%;
  top: calc(100% + 24px);
}
/* From 1280px, where the design puts them: measured from the page's centre
   across, and from the top of the text down. */
@media (min-width: 1280px) {
  .lanre {
    left: calc(50% - 506px);
    top: -63px;
  }
  .inioluwa {
    right: auto;
    left: calc(50% + 438px);
    top: -60px;
  }
  .favour {
    right: auto;
    left: calc(50% + 334px);
    top: 276px;
  }
}

/* Once landed, each cursor wanders a little, like someone's hand on a mouse. */
.drift {
  animation: drift 6s ease-in-out infinite alternate;
}
@keyframes drift {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(5px, -3px);
  }
  100% {
    transform: translate(-3px, 4px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .drift {
    animation: none;
  }
}
</style>
