<template>
  <!--
    One picture per feature, in the style of the original hero images: a card
    from the app with a second card (usually the live slide) laid over it,
    floating on the page's pastel. Drawn here, not exported, so it stays crisp
    at any size and uses the app's own fonts and colours.
  -->
  <div class="art" role="img" :aria-label="label">
    <!-- Bible: one composed picture. A search card, with the live slide card
         laid over its lower half, floating on the stage. -->
    <div v-if="kind === 'bible'" class="comp">
      <div class="sc">
        <p class="sc-crumb">Quick Actions <PhCaretRight weight="bold" /> Search</p>
        <div class="sc-row">
          <span class="sc-input">
            <PhMagnifyingGlass weight="regular" />
            <span>genesis 1 1</span><i class="caret"></i>
          </span>
          <span class="sc-x"><PhX weight="regular" /></span>
        </div>
        <p class="sc-result"><PhBookOpen weight="regular" /> <em>Bible:</em> <b>Genesis 1:1</b></p>
      </div>
      <div class="sl">
        <span class="sl-title">Genesis 1:1</span>
        <span class="sl-live"><i></i>LIVE</span>
        <p class="sl-text">In the beginning God created the heavens and the earth.</p>
        <span class="sl-ref">Genesis 1:1 • NKJV</span>
        <PhArrowsOutSimple weight="regular" class="sl-exp" />
      </div>
    </div>

    <!-- Team: one shared schedule with teammates in it, and a notice laid over. -->
    <div v-else-if="kind === 'team'" class="comp tm">
      <div class="tm-card">
        <p class="tm-head">
          <b>Sunday service</b>
          <span class="avs"><i class="b">D</i><i class="g">G</i><i class="v">S</i></span>
        </p>
        <div class="tm-row">
          <img src="/hero/announcements-interlude-slide.webp" alt="" draggable="false" />
          <span>Welcome and notices <em><PhTextT weight="regular" /> Text</em></span>
        </div>
        <div class="tm-row edit">
          <img src="/hero/oceans-song-slide.webp" alt="" draggable="false" />
          <span>Oceans <em><PhMusicNotes weight="regular" /> Song</em></span>
          <i class="tm-flag b"><PhLockKey weight="fill" /> Daniel is editing</i>
        </div>
        <div class="tm-row">
          <img src="/hero/bible-slide.webp" alt="" draggable="false" />
          <span>Romans 5:8 <em><PhBookOpen weight="regular" /> Bible</em></span>
        </div>
        <span class="tm-cursor">
          <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M3 2l17 8-7 2-3 7z" fill="#f1c778" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" /></svg>
          <i>Grace</i>
        </span>
      </div>
      <div class="tm-toast">
        <span class="tm-av">S</span>
        <div>
          <b>"Amazing Grace" and 1 other slide</b>
          <p>Added by Sarah, just now</p>
        </div>
        <span class="tm-thumbs">
          <img src="/hero/amazing-grace-song-slide.webp" alt="" draggable="false" />
          <img src="/hero/countdown-slide.webp" alt="" draggable="false" />
        </span>
      </div>
    </div>

    <!-- Songs: the song toolbar, with the live slide laid over it. -->
    <div v-else-if="kind === 'songs'" class="comp">
      <div class="cp" style="left: 20cqw; top: 0; width: 60cqw">
        <p class="cp-crumb">Search song lyrics <PhCaretRight weight="bold" /> Oceans</p>
        <div class="cp-chips"><i>Verse 1</i><i class="on">Chorus</i><i>Verse 2</i><i>Bridge</i></div>
      </div>
      <div class="cp-pic" style="left: 16cqw; top: 17cqw; width: 68cqw">
        <img src="/hero/oceans-song-slide.webp" alt="" draggable="false" />
        <span class="cp-live"><i></i>LIVE</span>
      </div>
    </div>

    <!-- Projection: the operator's schedule, and the slide on the projector. -->
    <div v-else-if="kind === 'projection'" class="comp">
      <div class="cp" style="left: 4cqw; top: 0; width: 54cqw">
        <p class="cp-head"><b>Slide Schedule</b><u>End Live Session</u></p>
        <div class="cp-row">
          <img src="/hero/let-us-pray-interlude-slide.webp" alt="" draggable="false" />
          <span>Philippians 4:6 <em><PhBookOpen weight="regular" /> Bible</em></span>
        </div>
        <div class="cp-row on">
          <img src="/hero/oceans-song-slide.webp" alt="" draggable="false" />
          <span>Oceans <em><PhMusicNotes weight="regular" /> Song</em></span>
          <i class="cp-dot"></i>
        </div>
        <div class="cp-row">
          <img src="/hero/bible-slide.webp" alt="" draggable="false" />
          <span>Romans 5:8 <em><PhBookOpen weight="regular" /> Bible</em></span>
        </div>
      </div>
      <div class="cp-pic" style="left: 36cqw; top: 25cqw; width: 60cqw">
        <img src="/hero/oceans-song-slide.webp" alt="" draggable="false" />
        <span class="cp-live"><i></i>LIVE</span>
        <PhArrowsOutSimple weight="regular" class="cp-exp" />
      </div>
    </div>

    <!-- Transcription: listening, a reference spotted, and the summary. -->
    <div v-else-if="kind === 'transcription'" class="comp">
      <div class="cp" style="left: 6cqw; top: 0; width: 68cqw">
        <div class="cp-listen">
          <span class="cp-mic"><PhMicrophone weight="fill" /></span>
          <span class="cp-wave" aria-hidden="true">
            <i v-for="n in 24" :key="n" :style="{ animationDelay: `${(n * 0.11) % 1.1}s` }"></i>
          </span>
          <b>Listening</b>
        </div>
        <p class="cp-said">…turn with me to <mark>Romans chapter five, verse eight</mark></p>
        <span class="cp-detected"><PhBookOpenText weight="fill" /> Romans 5:8 <u>Send</u></span>
      </div>
      <div class="cp cp-sum" style="left: 32cqw; top: 29cqw; width: 64cqw">
        <p class="cp-crumb"><PhSparkle weight="fill" /> Sermon summary</p>
        <ul>
          <li><PhCheckCircle weight="fill" /> Grace is a gift, not a wage</li>
          <li><PhCheckCircle weight="fill" /> Love came first, before we did</li>
          <li><PhCheckCircle weight="fill" /> Go and say it plainly</li>
        </ul>
      </div>
    </div>

    <!-- Browser: a tab, and the browser's own install prompt laid over it. -->
    <div v-else-if="kind === 'browser'" class="comp">
      <div class="cp-bw" style="left: 3cqw; top: 0; width: 76cqw">
        <div class="cp-chrome">
          <span class="tab"><PhBrowser weight="fill" /> Cloud of Worship</span>
          <span class="url"><PhLock weight="fill" /> app.cloudofworship.com</span>
        </div>
        <div class="cp-bwbody">
          <img src="/hero/bible-slide.webp" alt="" draggable="false" />
          <span class="cp-live"><i></i>LIVE</span>
        </div>
      </div>
      <div class="cp cp-install" style="left: 58cqw; top: 25cqw; width: 38cqw">
        <span class="cp-app"><img src="/cow-logo-square.jpg" alt="" draggable="false" /></span>
        <b>Install Cloud of Worship?</b>
        <p>app.cloudofworship.com</p>
        <span class="cp-btns"><i>Cancel</i><u>Install</u></span>
      </div>
    </div>

    <!-- Offline: the live slide, and the app's own offline notice over it. -->
    <div v-else-if="kind === 'offline'" class="comp">
      <div class="cp-pic" style="left: 4cqw; top: 0; width: 62cqw">
        <img src="/hero/oceans-song-slide.webp" alt="" draggable="false" />
        <span class="cp-live"><i></i>LIVE</span>
      </div>
      <div class="cp cp-toast" style="left: 36cqw; top: 26cqw; width: 60cqw">
        <PhCloudSlash weight="regular" class="big" />
        <div>
          <b>You are offline</b>
          <p>CoW will save your work until an internet connection returns.</p>
          <span class="ok">Ok, got it.</span>
        </div>
      </div>
      <span class="cp-stamp" style="left: 4cqw; top: 41cqw"><PhCheckCircle weight="fill" /> Saved on this device</span>
    </div>
  </div>
</template>

<script setup>
import {
  PhArrowsOutSimple,
  PhBookOpen,
  PhBookOpenText,
  PhBrowser,
  PhCaretRight,
  PhCheckCircle,
  PhCloudSlash,
  PhLock,
  PhLockKey,
  PhMagnifyingGlass,
  PhMicrophone,
  PhMusicNotes,
  PhSparkle,
  PhTextT,
  PhX,
} from "@phosphor-icons/vue"

defineProps({
  kind: { type: String, required: true },
  label: { type: String, default: "" },
})
</script>

<style scoped>
.art {
  position: relative;
  width: 100%;
  height: 100%;
  container-type: inline-size;
  line-height: 1.25;
  color: #1a1f2e;
  /* A picture, not content. */
  user-select: none;
  -webkit-user-select: none;
  cursor: default;
}
.art img {
  -webkit-user-drag: none;
  pointer-events: none;
}
.art svg {
  flex: none;
}
/* ---- Bible: the composed picture ---- */
.comp {
  position: absolute;
  inset: 0;
  font-size: 2.4cqw;
}
.sc {
  position: absolute;
  left: 26cqw;
  top: 0;
  width: 48cqw;
  padding: 2.4cqw 2.6cqw 8cqw;
  border-radius: 3cqw;
  background: #fff;
  box-shadow: 0 2.4cqw 5cqw -2.4cqw rgba(12, 15, 25, 0.35);
}
.sc-crumb {
  display: flex;
  align-items: center;
  gap: 1cqw;
  font-size: 2.1cqw;
  color: #374151;
}
.sc-crumb svg {
  color: #a855f7;
}
.sc-row {
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  margin-top: 2cqw;
  padding: 1cqw;
  border-radius: 2cqw;
  background: #f1f2f5;
}
.sc-input {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1.2cqw;
  padding: 1.6cqw 2cqw;
  border-radius: 1.6cqw;
  background: #f8f8fa;
  font-size: 2.5cqw;
  color: #1a1f2e;
}
.sc-input svg {
  color: #8f8f98;
}
.sc-x {
  display: grid;
  place-items: center;
  width: 6.4cqw;
  height: 6.4cqw;
  border-radius: 1.6cqw;
  background: #fff;
  font-size: 3cqw;
  box-shadow: 0 0.8cqw 0 #d9dde6, 0 1.2cqw 2cqw -1cqw rgba(12, 15, 25, 0.3);
}
.caret {
  width: 0.35cqw;
  height: 3.2cqw;
  margin-left: -1cqw;
  background: #8a41c9;
  animation: blink 0.9s step-end infinite;
}
.sc-result {
  position: absolute;
  left: 2.6cqw;
  right: 2.6cqw;
  top: 16cqw;
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  padding: 1.2cqw 1.8cqw;
  border-radius: 1.6cqw;
  background: #f8f8fa;
  font-size: 2.6cqw;
}
.sc-result svg {
  font-size: 3.2cqw;
  color: #374151;
}
.sc-result em {
  padding: 0;
  background: none;
  color: #4b5263;
  font-size: inherit;
  font-style: italic;
  font-weight: 400;
}
.sl {
  position: absolute;
  left: 21cqw;
  top: 22cqw;
  width: 58cqw;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 3cqw;
  background: linear-gradient(180deg, #05070a 0%, #17212d 100%);
  color: #fff;
  font-family: Inter, Geist, sans-serif;
  box-shadow: 0 3cqw 6cqw -2cqw rgba(12, 15, 25, 0.6);
}
.sl-title {
  position: absolute;
  left: 2.6cqw;
  top: 2.4cqw;
  font-size: 2.6cqw;
  font-weight: 700;
}
.sl-live {
  position: absolute;
  right: 2.4cqw;
  top: 2cqw;
  display: inline-flex;
  align-items: center;
  gap: 1cqw;
  padding: 0.9cqw 2cqw;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 0.25cqw rgba(255, 255, 255, 0.18);
  color: #ff5a4f;
  font-size: 2.1cqw;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.sl-live i {
  width: 1.6cqw;
  height: 1.6cqw;
  border-radius: 9999px;
  background: #ff5a4f;
  animation: blink 1.6s ease-in-out infinite;
}
.sl-text {
  position: absolute;
  left: 4cqw;
  right: 4cqw;
  top: 50%;
  transform: translateY(-56%);
  text-align: center;
  font-size: 4.4cqw;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.01em;
}
.sl-ref {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9cqw;
  text-align: center;
  font-size: 1.9cqw;
  font-weight: 700;
}
.sl-exp {
  position: absolute;
  right: 2.6cqw;
  bottom: 2.4cqw;
  font-size: 3cqw;
  color: rgba(255, 255, 255, 0.35);
}


/* ---- Team: the composed picture ---- */
.tm-card {
  position: absolute;
  left: 8cqw;
  top: 0;
  width: 64cqw;
  padding: 2.4cqw 2.6cqw 3.2cqw;
  border-radius: 3cqw;
  background: #fff;
  box-shadow: 0 2.4cqw 5cqw -2.4cqw rgba(12, 15, 25, 0.35);
}
.tm-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2cqw;
  font-size: 2.2cqw;
  color: #374151;
}
.tm-head b {
  font-weight: 500;
}
.tm .avs {
  display: flex;
}
.tm .avs i {
  display: grid;
  place-items: center;
  width: 4.6cqw;
  height: 4.6cqw;
  margin-left: -1cqw;
  border-radius: 9999px;
  border: 0.45cqw solid #fff;
  font-style: normal;
  font-size: 1.9cqw;
  font-weight: 700;
}
.tm .avs .b {
  background: #528bfe;
  color: #fff;
}
.tm .avs .g {
  background: #f1c778;
  color: #1a1f2e;
}
.tm .avs .v {
  background: #bc7be8;
  color: #fff;
}
.tm-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2.2cqw;
  margin-top: 1.6cqw;
  padding: 1.1cqw 2cqw 1.1cqw 1.1cqw;
  border-radius: 2cqw;
  background: #f4f5f7;
  font-size: 2.3cqw;
  font-weight: 600;
}
.tm-row img {
  width: 13cqw;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 1.2cqw;
}
.tm-row span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8cqw;
}
.tm-row em {
  font-size: 1.6cqw;
  padding: 0.3cqw 1.2cqw;
}
.tm-row.edit {
  background: #fff;
  box-shadow: 0 0 0 0.5cqw #528bfe;
}
.tm-flag {
  position: absolute;
  right: 2cqw;
  top: -1.8cqw;
  display: inline-flex;
  align-items: center;
  gap: 0.8cqw;
  padding: 0.6cqw 1.8cqw;
  border-radius: 9999px;
  background: #528bfe;
  color: #fff;
  font-style: normal;
  font-size: 1.7cqw;
  font-weight: 700;
}
.tm-cursor {
  position: absolute;
  right: 9cqw;
  top: 12cqw;
  display: inline-flex;
  align-items: flex-start;
  font-size: 4cqw;
  animation: bob 5s ease-in-out infinite;
}
.tm-cursor i {
  margin: 2.6cqw 0 0 -0.4cqw;
  padding: 0.5cqw 1.6cqw;
  border-radius: 9999px;
  background: #f1c778;
  color: #1a1f2e;
  font-style: normal;
  font-size: 1.7cqw;
  font-weight: 700;
}
.tm-toast {
  position: absolute;
  left: 38cqw;
  top: 37cqw;
  display: flex;
  align-items: center;
  gap: 2cqw;
  width: 57cqw;
  padding: 2cqw 2.4cqw;
  border-radius: 2.6cqw;
  background: #f3e8ff;
  box-shadow: 0 3cqw 6cqw -2cqw rgba(12, 15, 25, 0.45);
  font-size: 2cqw;
}
.tm-toast b {
  display: block;
  font-weight: 700;
}
.tm-toast p {
  margin-top: 0.4cqw;
  font-size: 1.7cqw;
  color: #6b4a8f;
}
.tm-av {
  display: grid;
  place-items: center;
  flex: none;
  width: 6cqw;
  height: 6cqw;
  border-radius: 9999px;
  background: #bc7be8;
  color: #fff;
  font-size: 2.4cqw;
  font-weight: 700;
}
.tm-thumbs {
  display: flex;
  flex: none;
  margin-left: auto;
}
.tm-thumbs img {
  width: 9cqw;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 1cqw;
  box-shadow: 0 0 0 0.4cqw #f3e8ff;
}
.tm-thumbs img + img {
  margin-left: -3cqw;
}

/* The little type chips (Song, Bible, Text) */
em {
  display: inline-flex;
  align-items: center;
  gap: 0.4cqw;
  padding: 0.3cqw 1.2cqw;
  border-radius: 9999px;
  background: #f1e6fc;
  color: #7e22ce;
  font-style: normal;
  font-size: 1.6cqw;
  font-weight: 600;
}

/* ---- Shared by the other five pictures ---- */
.cp {
  position: absolute;
  padding: 2.4cqw 2.6cqw;
  border-radius: 3cqw;
  background: #fff;
  box-shadow: 0 2.4cqw 5cqw -2.4cqw rgba(12, 15, 25, 0.35);
  font-size: 2.3cqw;
}
.cp-crumb {
  display: flex;
  align-items: center;
  gap: 1cqw;
  font-size: 2.1cqw;
  color: #374151;
}
.cp-crumb svg {
  color: #a855f7;
}
.cp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6cqw;
  font-size: 2.2cqw;
  color: #374151;
}
.cp-head b {
  font-weight: 500;
}
.cp-head u {
  padding: 0.7cqw 1.8cqw;
  border-radius: 9999px;
  background: #e54d42;
  color: #fff;
  font-size: 1.7cqw;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 0.4cqw 0 #b93b32;
}
.cp-pic {
  position: absolute;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 3cqw;
  background: #101010;
  box-shadow: 0 3cqw 6cqw -2cqw rgba(12, 15, 25, 0.6);
}
.cp-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cp-live {
  position: absolute;
  right: 2.4cqw;
  top: 2cqw;
  display: inline-flex;
  align-items: center;
  gap: 1cqw;
  padding: 0.9cqw 2cqw;
  border-radius: 9999px;
  background: rgba(12, 15, 25, 0.7);
  box-shadow: inset 0 0 0 0.25cqw rgba(255, 255, 255, 0.18);
  color: #ff5a4f;
  font-family: Inter, Geist, sans-serif;
  font-size: 2.1cqw;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.cp-live i {
  width: 1.6cqw;
  height: 1.6cqw;
  border-radius: 9999px;
  background: #ff5a4f;
  animation: blink 1.6s ease-in-out infinite;
}
.cp-exp {
  position: absolute;
  right: 2.6cqw;
  bottom: 2.4cqw;
  font-size: 3cqw;
  color: rgba(255, 255, 255, 0.5);
}

/* songs */
.cp-chips {
  display: flex;
  gap: 1.2cqw;
  margin-top: 2cqw;
  padding: 1cqw;
  border-radius: 2cqw;
  background: #f1f2f5;
}
.cp-chips i {
  flex: 1;
  padding: 1.3cqw 0;
  border-radius: 9999px;
  background: #fff;
  text-align: center;
  font-style: normal;
  font-size: 2.2cqw;
  font-weight: 600;
  box-shadow: 0 0.5cqw 0 #d9dde6;
}
.cp-chips .on {
  background: #8a41c9;
  color: #fff;
  box-shadow: 0 0.5cqw 0 #6b17a9;
}

/* projection */
.cp-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2cqw;
  margin-top: 1.4cqw;
  padding: 1cqw 2cqw 1cqw 1cqw;
  border-radius: 2cqw;
  background: #f4f5f7;
  font-size: 2.2cqw;
  font-weight: 600;
}
.cp-row.on {
  background: #ffe9e8;
}
.cp-row img {
  width: 12cqw;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 1.2cqw;
}
.cp-row span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7cqw;
}
.cp-row em {
  padding: 0.3cqw 1.2cqw;
  font-size: 1.6cqw;
}
.cp-dot {
  position: absolute;
  top: 0.8cqw;
  left: 0.8cqw;
  width: 1.8cqw;
  height: 1.8cqw;
  border-radius: 9999px;
  background: #e54d42;
  box-shadow: 0 0 0 0.4cqw #fff;
}

/* transcription */
.cp-listen {
  display: flex;
  align-items: center;
  gap: 2cqw;
  font-size: 2.2cqw;
}
.cp-mic {
  display: grid;
  place-items: center;
  flex: none;
  width: 6.4cqw;
  height: 6.4cqw;
  border-radius: 9999px;
  background: #ff8980;
  color: #0c0f19;
  font-size: 3.4cqw;
}
.cp-wave {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.8cqw;
  height: 6cqw;
}
.cp-wave i {
  width: 0.8cqw;
  height: 100%;
  border-radius: 9999px;
  background: #3b4151;
  transform: scaleY(0.25);
  animation: wave 1.1s ease-in-out infinite;
}
.cp-said {
  margin-top: 2.2cqw;
  font-size: 2.5cqw;
  font-weight: 500;
}
mark {
  padding: 0 0.8cqw;
  border-radius: 0.9cqw;
  background: #eceef2;
  color: #1a1f2e;
}
.cp-detected {
  display: inline-flex;
  align-items: center;
  gap: 1.4cqw;
  margin-top: 2cqw;
  padding: 1cqw 1cqw 1cqw 2.4cqw;
  border-radius: 9999px;
  background: #3b4151;
  color: #fff;
  font-size: 2.2cqw;
  font-weight: 600;
}
.cp-detected u {
  padding: 0.7cqw 2cqw;
  border-radius: 9999px;
  background: #fff;
  color: #1a1f2e;
  font-size: 1.9cqw;
  text-decoration: none;
}
.cp-sum {
  background: #f4f5f7;
}
.cp-sum .cp-crumb svg {
  color: #6b7280;
}
.cp-sum ul {
  display: flex;
  flex-direction: column;
  gap: 1.6cqw;
  margin-top: 2cqw;
}
.cp-sum li {
  display: flex;
  align-items: center;
  gap: 1.4cqw;
  font-size: 2.3cqw;
  font-weight: 500;
}
.cp-sum li svg {
  font-size: 3.2cqw;
  color: #3b4151;
}

/* browser */
.cp-bw {
  position: absolute;
  overflow: hidden;
  border-radius: 3cqw;
  background: #fff;
  box-shadow: 0 2.6cqw 5cqw -2.4cqw rgba(12, 15, 25, 0.4);
}
.cp-chrome {
  display: flex;
  align-items: center;
  gap: 2cqw;
  padding: 1.6cqw 2.4cqw;
  background: #0c0f19;
  color: #e4e4e7;
  font-size: 1.9cqw;
}
.cp-chrome .tab,
.cp-chrome .url {
  display: inline-flex;
  align-items: center;
  gap: 1cqw;
  padding: 0.8cqw 2cqw;
  border-radius: 9999px;
}
.cp-chrome .tab {
  background: #6d5bd6;
  color: #fff;
}
.cp-chrome .url {
  flex: 1;
  background: #1b1f2e;
}
.cp-bwbody {
  position: relative;
  padding: 2.4cqw;
  background: #f4f5f7;
}
.cp-bwbody img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 1.8cqw;
}
.cp-bwbody .cp-live {
  right: 4.6cqw;
  top: 4.4cqw;
}
.cp-install {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8cqw;
  padding: 2.6cqw;
  font-size: 2cqw;
}
.cp-install b {
  margin-top: 1cqw;
  font-size: 2.5cqw;
}
.cp-install p {
  font-size: 1.8cqw;
  color: #6b7280;
}
.cp-app img {
  display: block;
  width: 7cqw;
  height: 7cqw;
  border-radius: 1.6cqw;
  object-fit: cover;
}
.cp-btns {
  display: flex;
  align-items: center;
  gap: 2.4cqw;
  align-self: flex-end;
  margin-top: 1.6cqw;
  font-size: 2cqw;
  font-weight: 600;
}
.cp-btns i {
  font-style: normal;
  color: #6b17a9;
}
.cp-btns u {
  padding: 0.9cqw 2.6cqw;
  border-radius: 9999px;
  background: #8a41c9;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 0.4cqw 0 #6b17a9;
}

/* offline */
.cp-toast {
  display: flex;
  align-items: flex-start;
  gap: 2.4cqw;
  padding: 2.8cqw;
  background: #f3e8ff;
  color: #3b0764;
}
.cp-toast .big {
  flex: none;
  font-size: 9cqw;
  color: #581c87;
}
.cp-toast b {
  font-size: 2.8cqw;
}
.cp-toast p {
  margin-top: 0.6cqw;
  font-size: 2cqw;
}
.cp-toast .ok {
  display: inline-block;
  margin-top: 1.4cqw;
  padding: 0.8cqw 2.2cqw;
  border-radius: 9999px;
  background: #a855f7;
  color: #fff;
  font-size: 1.9cqw;
  font-weight: 600;
}
.cp-stamp {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 1.2cqw;
  padding: 1.3cqw 2.6cqw 1.3cqw 1.8cqw;
  border-radius: 9999px;
  background: #fff;
  font-size: 2.2cqw;
  font-weight: 600;
  box-shadow: 0 1.4cqw 3cqw -1.6cqw rgba(12, 15, 25, 0.45);
}
.cp-stamp svg {
  font-size: 3.2cqw;
  color: #2f9e5c;
}

/* Motion shared by the pictures */
@keyframes blink {
  50% {
    opacity: 0.35;
  }
}
@keyframes wave {
  50% {
    transform: scaleY(1);
  }
}
@keyframes bob {
  50% {
    transform: translate(-1.6cqw, 1.2cqw);
  }
}

@media (prefers-reduced-motion: reduce) {
  .art *,
  .art *::before {
    animation: none !important;
  }
}
</style>
