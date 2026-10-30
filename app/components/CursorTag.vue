<template>
  <!-- A collaborator's cursor: a pointer resting on the corner of a name pill. -->
  <div class="cursor-tag relative" :style="{ width: `${width}px`, height: `${height}px` }">
    <div
      class="pill absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap text-[14px] font-semibold"
      :style="{ background, borderRadius: `${radius}px`, color: textColor }"
    >
      <span :style="{ opacity: labelOpacity }">{{ name }}</span>
    </div>
    <svg
      class="arrow absolute"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      aria-hidden="true"
      :style="{ opacity: arrowOpacity, transform: `scale(${0.6 + 0.4 * arrowOpacity})` }"
    >
      <path
        d="M2.075 3.362L9.35 22.762C9.422 22.953 9.551 23.118 9.719 23.233C9.888 23.348 10.087 23.41 10.291 23.408C10.496 23.407 10.694 23.343 10.861 23.225C11.028 23.108 11.155 22.942 11.225 22.75L14.137 14.737C14.188 14.6 14.268 14.475 14.371 14.371C14.475 14.268 14.6 14.188 14.737 14.137L22.75 11.225C22.941 11.155 23.107 11.028 23.225 10.862C23.343 10.695 23.407 10.496 23.408 10.292C23.409 10.088 23.348 9.888 23.233 9.72C23.117 9.551 22.953 9.422 22.762 9.35L3.362 2.075C3.182 2.007 2.987 1.993 2.799 2.034C2.612 2.074 2.44 2.168 2.304 2.304C2.168 2.44 2.074 2.612 2.034 2.8C1.993 2.987 2.007 3.183 2.075 3.362V3.362Z"
        fill="#1A1F2E"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
// Used both for the cursors resting in the projection section and for the
// ones flying there from the window dots, which pass in their in-between
// size, colour and fades.
defineProps({
  name: { type: String, required: true },
  width: { type: Number, default: 114 },
  height: { type: Number, default: 52 },
  radius: { type: Number, default: 26 },
  background: { type: String, required: true },
  textColor: { type: String, default: "#F8F9FB" },
  labelOpacity: { type: Number, default: 1 },
  arrowOpacity: { type: Number, default: 1 },
})
</script>

<style scoped>
/* The pointer's tip sits just above the pill's top-left corner. */
.arrow {
  left: -1.3px;
  top: -14.3px;
  transform-origin: 2px 2px;
}
</style>
