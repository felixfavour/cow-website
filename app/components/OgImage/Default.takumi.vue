<script setup lang="ts">
/**
 * Shared social card for every page on the marketing site.
 *
 * Rendered by nuxt-og-image (Satori) at 1200x630. Pages vary only `eyebrow`,
 * `accent` and `title`; everything else is fixed so the cards read as one family.
 *
 * The growth claim lives HERE rather than in each page's copy, so it is a
 * one-line change in one file when the number moves. It is deliberately not
 * baked into the artwork the way the old cow-og-image.jpeg was.
 */
const CHURCH_COUNT = "3,500+"

withDefaults(
  defineProps<{
    /** Small pill above the headline, e.g. "Pricing" or "Feature". Optional. */
    eyebrow?: string
    /** Leading phrase of the headline, tinted cream. Optional. */
    accent?: string
    /** The headline. Keep it under ~90 characters so it stays on four lines. */
    title?: string
  }>(),
  {
    eyebrow: "",
    accent: "",
    title: "Presentation software for your growing church.",
  },
)
</script>

<template>
  <div
    :style="{
      position: 'relative',
      width: '1200px',
      height: '630px',
      display: 'flex',
      fontFamily: 'Bricolage Grotesque',
    }"
  >
    <!-- Brand mesh gradient, generated from the original card's palette. -->
    <img
      src="/images/og/backdrop.jpg"
      :style="{ position: 'absolute', top: '0px', left: '0px', width: '1200px', height: '630px' }"
    />

    <div
      :style="{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '1200px',
        height: '630px',
        padding: '72px 76px',
      }"
    >
      <div :style="{ display: 'flex', flexDirection: 'column' }">
        <div
          v-if="eyebrow"
          :style="{
            display: 'flex',
            alignSelf: 'flex-start',
            marginBottom: '26px',
            padding: '9px 20px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.30)',
            color: '#FFFFFF',
            fontSize: '23px',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }"
        >
          {{ eyebrow.toUpperCase() }}
        </div>

        <div
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '1000px',
            fontSize: '68px',
            lineHeight: 1.14,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }"
        >
          <span v-if="accent" :style="{ color: '#FFE4D6', marginRight: '16px' }">{{ accent }}</span>
          <span :style="{ fontWeight: 400 }">{{ title }}</span>
        </div>
      </div>

      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '1048px',
        }"
      >
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <svg width="46" height="46" viewBox="0 0 55 55" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.89259 49.3029C5.87416 48.6805 4.91726 47.9021 4.02188 46.9675C1.34229 44.1705 0.00166228 40.7519 0 36.7118C0 33.2488 0.976589 30.1632 2.92977 27.455C4.88295 24.7467 7.4387 23.0153 10.597 22.2605C11.1571 20.0586 12.0191 18.0824 13.1831 16.3321H21.9357C24.0368 16.3321 25.7402 18.0507 25.7402 20.1707V45.4642C25.7402 47.5842 24.0368 49.3029 21.9357 49.3029H6.89259ZM41.697 16.3321C43.8214 19.4575 44.8829 23.0764 44.8815 27.1886C47.749 27.5438 50.1285 28.865 52.0202 31.1524C53.9119 33.4397 54.8569 36.1142 54.8552 39.1758C54.8552 42.5056 53.7648 45.3363 51.5839 47.6681C50.9945 48.2982 50.3708 48.8431 49.713 49.3029H32.6698C30.5686 49.3029 28.8653 47.5842 28.8653 45.4642V20.1707C28.8653 18.0507 30.5686 16.3321 32.6698 16.3321H41.697ZM28.8653 8.59619C32.7504 8.89468 36.135 10.4221 39.0189 13.1784H32.6698C30.5686 13.1784 28.8653 11.4598 28.8653 9.33974V8.59619ZM25.7402 8.62128V9.33974C25.7402 11.4598 24.0368 13.1784 21.9357 13.1784H15.8641C16.1743 12.8892 16.4965 12.609 16.8306 12.3378C19.4964 10.1733 22.4663 8.93444 25.7402 8.62128Z"
              fill="#FFFFFF"
            />
          </svg>
          <span
            :style="{
              marginLeft: '16px',
              color: '#FFFFFF',
              fontSize: '27px',
              fontWeight: 600,
            }"
          >
            Cloud of Worship
          </span>
        </div>

        <div :style="{ display: 'flex', color: '#FFFFFF', fontSize: '25px', fontWeight: 600 }">
          Trusted by {{ CHURCH_COUNT }} churches
        </div>
      </div>
    </div>
  </div>
</template>
