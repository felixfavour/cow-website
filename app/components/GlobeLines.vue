<template>
  <!--
    The line-drawn globe from the Ends of The Earth artwork: an outline, a
    tilted equator and four meridians. When motion is allowed the meridians
    widen and narrow in turn, so the globe slowly turns.
  -->
  <svg
    viewBox="0 0 1000 1000"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <g
      transform="rotate(12 500 500)"
      stroke="currentColor"
      stroke-width="2"
      vector-effect="non-scaling-stroke"
    >
      <circle cx="500" cy="500" r="495" vector-effect="non-scaling-stroke" />
      <ellipse
        cx="500"
        cy="500"
        rx="495"
        ry="150"
        vector-effect="non-scaling-stroke"
      />
      <ellipse
        v-for="meridian in meridians"
        :key="meridian.offset"
        cx="500"
        cy="500"
        :rx="meridian.rx"
        ry="495"
        vector-effect="non-scaling-stroke"
      >
        <animate
          v-if="turning"
          attributeName="rx"
          values="495;0;495"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.12 0 0.39 0;0.61 1 0.88 1"
          :dur="`${PERIOD}s`"
          :begin="`-${meridian.offset * PERIOD}s`"
          repeatCount="indefinite"
        />
      </ellipse>
    </g>
  </svg>
</template>

<script setup>
// Seconds for a meridian to go from the edge, through the middle, back to the edge.
const PERIOD = 24
const R = 495

// Evenly spread over the turn. The resting widths match where each one starts
// its animation, so nothing jumps when the animation is switched on.
const meridians = [0.125, 0.375, 0.625, 0.875].map((offset) => ({
  offset,
  rx: Math.round(R * Math.abs(Math.cos(Math.PI * offset))),
}))

// Off on the server and for anyone who asks for less motion.
const turning = ref(false)
onMounted(() => {
  turning.value = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
})
</script>
