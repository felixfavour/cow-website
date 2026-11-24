<template>
  <div class="section page">
    <!-- HERO SECTION -->
    <div class="inner py-[10%] md:py-[5%]">
      <div
        class="texts max-w-[900px] 2xl:max-w-[1000px] text-center mx-auto flex flex-col gap-4 2xl:gap-6"
      >
        <div
          class="small-text secondary-font text-center text-md lg:text-lg text-[#C94136] font-bold"
        >
          Legal
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Content and Licences
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Where the Bibles, hymns, and songs in Cloud of Worship come from, and
          who owns them.
        </p>
        <p class="description text-sm">Last updated: November 24, 2026</p>
      </div>
    </div>

    <main class="inner smaller-inner">
      <h2>The short version</h2>
      <ul>
        <li>The Cloud of Worship code is open source (AGPL-3.0-only).</li>
        <li>
          The Bibles, hymns, and songs are not ours. They belong to their
          owners, or are in the public domain.
        </li>
        <li>
          Your church is responsible for the song and performance licences it
          needs, such as CCLI or OneLicense, and for reporting its song use to
          them.
        </li>
        <li>
          Rights holders can ask us to change or remove anything. See
          <a href="#takedown">how</a>.
        </li>
      </ul>

      <h2>Bible translations</h2>
      <p>
        We offer {{ rows.length }} translations. {{ publicDomainCount }} are
        marked public domain. The rest are under copyright. We offer them free of
        charge and show the copyright notice their publisher requires. The
        notice below is the one shown in the app.
      </p>

      <h3>Public domain</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Translation</th>
              <th>Language</th>
              <th>Licence basis</th>
              <th>Notice</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in publicDomain" :key="r.id">
              <td>{{ r.name }} ({{ r.id }})</td>
              <td>{{ r.language }}</td>
              <td>
                <a v-if="policyUrls[r.id]" :href="policyUrls[r.id]" rel="external nofollow noopener" target="_blank">{{ basis(r) }}</a>
                <template v-else>{{ basis(r) }}</template>
              </td>
              <td>{{ r.notice }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Under copyright</h3>
      <p>
        These remain the property of their publishers. Showing a text in Cloud
        of Worship does not transfer any rights in it. Please check your own
        rights to quote or project it, and keep the notice with it when you
        publish.
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Translation</th>
              <th>Language</th>
              <th>Licence basis</th>
              <th>Notice</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in copyrighted" :key="r.id">
              <td>{{ r.name }} ({{ r.id }})</td>
              <td>{{ r.language }}</td>
              <td>
                <a v-if="policyUrls[r.id]" :href="policyUrls[r.id]" rel="external nofollow noopener" target="_blank">{{ basis(r) }}</a>
                <template v-else>{{ basis(r) }}</template>
              </td>
              <td>{{ r.notice }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Hymns</h2>
      <p>
        The hymn library is made of traditional hymns. Where the words or tune
        of a hymn are still under copyright, they belong to their authors and
        publishers, and your church needs its own licence to use them.
      </p>

      <h2>Songs and lyrics</h2>
      <p>
        Song lyrics belong to their writers and publishers. We do not claim
        ownership of any of them.
      </p>
      <ul>
        <li>
          <strong>Your church's songs.</strong> Songs you add are yours to
          manage. You promise you have the right to use them (Terms of Service,
          section 6).
        </li>
        <li>
          <strong>The shared catalogue.</strong> It lets churches find and
          display songs. Having a song in it is not a licence to use it.
        </li>
        <li>
          <strong>Your licence.</strong> Projecting lyrics and streaming a
          service usually needs a licence from CCLI, OneLicense, or the rights
          holder. Cloud of Worship does not provide one. Check that yours
          covers livestreams.
        </li>
        <li>
          <strong>Song usage summaries.</strong> We send a church a list of the
          songs it used, on request. We are working on sending every song slide
          added to a schedule in a month to the members of that church's team.
          The list shows exactly which song slides were added. But songs are
          contributed by people, so a song is not always tied to a verified
          title or artist. Use the list as a guide, check it against what your
          church sang, and fix any titles or writers before you report to a
          licensing body.
        </li>
      </ul>

      <h2>Other content</h2>
      <ul>
        <li>
          <strong>Your uploads.</strong> Backgrounds, videos, images, and
          slides stay yours. You promise you have the right to use them.
        </li>
        <li>
          <strong>Software.</strong> Open source libraries keep their own
          licences, listed in our public repository.
        </li>
        <li>
          <strong>Name and logo.</strong> "Cloud of Worship" and the logo are
          trademarks. The open source licence does not cover them.
        </li>
      </ul>

      <h2 id="takedown">Rights holders: ask us to change or remove something</h2>
      <p>
        If you own a text, lyric, or other work shown in Cloud of Worship and
        want it changed, credited, or removed, email
        <a
          href="mailto:legal@cloudofworship.com?subject=Copyright%20notice"
          rel="external nofollow noopener"
          >legal@cloudofworship.com</a
        >
        with the subject "Copyright notice". Tell us what the work is, where it
        appears, and how to reach you. The full steps are in section 10 of our
        <a href="/terms-of-service">Terms of Service</a>.
      </p>
      <p>
        If you think a text here is shown with the wrong notice or the wrong
        status, tell us the same way and we will fix it.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
type BibleRow = {
  id: string
  name: string
  language: string
  publicDomain: boolean
  notice: string
}

// Mirrors `bibleVersions` in the API (src/modules/settings/controller.js),
// which is what the app shows. Update both together.
const rows: BibleRow[] = [
  {
    "id": "AMHARIC",
    "name": "Amharic Bible (መጽሐፍ ቅዱስ)",
    "language": "Amharic",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Amharic Bible (መጽሐፍ ቅዱስ (የብሉይና የሐዲስ ኪዳን መጻሕፍት))."
  },
  {
    "id": "SVD",
    "name": "Arabic SVD (1865)",
    "language": "Arabic",
    "publicDomain": true,
    "notice": "Scripture quotations taken from the Arabic Smith & Van Dyck Version 1865. Public Domain."
  },
  {
    "id": "CUNPSS",
    "name": "Chinese Simplified (新标点和合本, 神版)",
    "language": "Chinese (Simplified)",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Chinese Union Version with New Punctuation (CUNP). Copyright © Hong Kong Bible Society. All rights reserved."
  },
  {
    "id": "CUVT",
    "name": "Chinese Traditional Union Version (1919)",
    "language": "Chinese (Traditional)",
    "publicDomain": true,
    "notice": "Scripture quotations taken from the Chinese Union Version Traditional 1919. Public Domain."
  },
  {
    "id": "ASV",
    "name": "American Standard Version",
    "language": "English",
    "publicDomain": true,
    "notice": "Scripture taken from the American Standard Version. Public Domain"
  },
  {
    "id": "AMP",
    "name": "Amplified Bible",
    "language": "English",
    "publicDomain": false,
    "notice": "All Scripture quotations, unless otherwise indicated, are taken from the Amplified Bible, Copyright © 2015 by The Lockman Foundation."
  },
  {
    "id": "AMPC",
    "name": "Amplified Bible, Classic Edition",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Amplified Bible, Classic Edition (AMPC)."
  },
  {
    "id": "CEV",
    "name": "Contemporary English Version",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations marked (CEV) are from the Contemporary English Version Copyright © 1991, 1992, 1995 by American Bible Society."
  },
  {
    "id": "ESV",
    "name": "English Standard Version",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers."
  },
  {
    "id": "GNT",
    "name": "Good News Translation",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Good News Translation (GNT). Copyright © American Bible Society."
  },
  {
    "id": "HCSB",
    "name": "Holman Christian Standard Bible",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Holman Christian Standard Bible (HCSB). Holman Christian Standard Bible® © Holman Bible Publishers."
  },
  {
    "id": "KJV",
    "name": "King James Version",
    "language": "English",
    "publicDomain": true,
    "notice": "Scripture taken from the King James Version. Public Domain"
  },
  {
    "id": "NASB",
    "name": "New American Standard Bible",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the (NASB®) New American Standard Bible®, Copyright © 1960, 1971 by The Lockman Foundation"
  },
  {
    "id": "NIV",
    "name": "New International Version",
    "language": "English",
    "publicDomain": false,
    "notice": "Scriptures taken from the Holy Bible, New International Version®, NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ All rights reserved worldwide."
  },
  {
    "id": "NKJV",
    "name": "New King James Version",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture taken from the New King James Version®. Copyright © 1982 by Thomas Nelson. All rights reserved."
  },
  {
    "id": "NLT",
    "name": "New Living Translation",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations marked (NLT) are taken from the Holy Bible, New Living Translation, copyright ©1996, 2004, 2015 by Tyndale House Foundation."
  },
  {
    "id": "MSG",
    "name": "The Message",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture taken from THE MESSAGE. Copyright © 1993, 1994, 1995, 1996, 2000, 2001, 2002."
  },
  {
    "id": "TPT",
    "name": "The Passion Translation",
    "language": "English",
    "publicDomain": false,
    "notice": "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc."
  },
  {
    "id": "WEB",
    "name": "World English Bible",
    "language": "English",
    "publicDomain": true,
    "notice": "Scripture taken from the World English Bible. Public Domain"
  },
  {
    "id": "YLT",
    "name": "Young's Literal Translation",
    "language": "English",
    "publicDomain": true,
    "notice": "Scripture taken from the Young's Literal Translation. Public Domain"
  },
  {
    "id": "AL",
    "name": "Agbenya La (Ewe Contemporary Bible)",
    "language": "Ewe",
    "publicDomain": false,
    "notice": "Agbenya La™ Ewe Contemporary Bible™ Copyright © 2011, 2015 by Biblica, Inc.® Used by permission. All rights reserved worldwide."
  },
  {
    "id": "EB14",
    "name": "Eʋegbe Biblia (Ewe Bible)",
    "language": "Ewe",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the EƲEGBE BIBLIA. Copyright © The Bible Society of Togo, 2014."
  },
  {
    "id": "LSG",
    "name": "French Louis Segond (1910)",
    "language": "French",
    "publicDomain": true,
    "notice": "Scripture quotations taken from La Sainte Bible par Louis Segond 1910. Public Domain."
  },
  {
    "id": "DELUT",
    "name": "German Luther Bible (Lutherbibel 1912)",
    "language": "German",
    "publicDomain": true,
    "notice": "Scripture quotations taken from the Lutherbibel 1912. Public Domain."
  },
  {
    "id": "SRK",
    "name": "Sabon Rai Don Kowa",
    "language": "Hausa",
    "publicDomain": false,
    "notice": "Scripture from the Hausa Contemporary Bible by Biblica, Inc."
  },
  {
    "id": "BIU",
    "name": "Baịbụlụ Nsọ nʼIgbo Ndị Ugbu a - BIU",
    "language": "Igbo",
    "publicDomain": false,
    "notice": "Scripture from the Igbo Contemporary Bible by Biblica, Inc."
  },
  {
    "id": "TB",
    "name": "Indonesian (Alkitab Terjemahan Baru)",
    "language": "Indonesian",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Terjemahan Baru Bible. Copyright © Indonesian Bible Society, 1974, 2018."
  },
  {
    "id": "CO1955",
    "name": "Japanese Colloquial (口語訳, 1955)",
    "language": "Japanese",
    "publicDomain": false,
    "notice": "Scripture quotations taken from The Bible, Colloquial Japanese. Copyright © Japan Bible Society, 1955, 1975, 1984, 2002."
  },
  {
    "id": "KRV",
    "name": "Korean Revised Version (개역한글, 1961)",
    "language": "Korean",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Korean Revised Version. Copyright © Korean Bible Society, 1961."
  },
  {
    "id": "PCM",
    "name": "Nigerian Pidgin Bible",
    "language": "Nigerian Pidgin",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Nigerian Pidgin Bible Translation"
  },
  {
    "id": "ARA",
    "name": "Portuguese Almeida Revista e Atualizada (ARA)",
    "language": "Portuguese",
    "publicDomain": true,
    "notice": "Scripture quotations taken from the Portuguese Almeida Revista e Atualizada (ARA), 1993 Revised Version. Public Domain."
  },
  {
    "id": "RUSSYNODAL",
    "name": "Russian Synodal Bible (1876)",
    "language": "Russian",
    "publicDomain": true,
    "notice": "Scripture quotations taken from the Russian Synodal Bible 1876. Public Domain."
  },
  {
    "id": "NTV",
    "name": "Nueva Traducción Viviente",
    "language": "Spanish",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Santa Biblia, Nueva Traducción Viviente, copyright © 2010 by Tyndale House Foundation."
  },
  {
    "id": "RVR09",
    "name": "Reina Valera 1909 Bible",
    "language": "Spanish",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Reina Valera 1909 Bible Translation"
  },
  {
    "id": "RVA2015",
    "name": "Reina Valera Actualizada",
    "language": "Spanish",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Reina Valera Actualizada Bible. Copyright © 2015 by Editorial Mundo Hispano."
  },
  {
    "id": "SRUV",
    "name": "Swahili Revised Union Version (SRUV)",
    "language": "Swahili",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Swahili Revised Union Version. Copyright © Bible Society of Kenya and Bible Society of Tanzania, 2005."
  },
  {
    "id": "AKNA",
    "name": "Twi Akuapem (Akuapem Twi Nkwa Asɛm, 2020)",
    "language": "Twi (Akuapem)",
    "publicDomain": false,
    "notice": "Akuapem Twi Nkwa Asɛm™ Owurayɛ Tumi © 2000, 2020. Biblica, Inc. All rights reserved worldwide."
  },
  {
    "id": "ASNA",
    "name": "Twi Asante (Asante Twi Nkwa Asɛm, 2020)",
    "language": "Twi (Asante)",
    "publicDomain": false,
    "notice": "Asante Twi Nkwa Asɛm™ Owurayɛ Tumi © 1996, 2020. Biblica, Inc. All rights reserved worldwide."
  },
  {
    "id": "ASWDC",
    "name": "Twi Asante (Twerɛ Kronkron, 2017)",
    "language": "Twi (Asante)",
    "publicDomain": false,
    "notice": "Asante-Twi Bible With Deutero-Canons © The Bible Society of Ghana, 2017"
  },
  {
    "id": "YBCV",
    "name": "Yoruba YBCV (Bibeli Mimọ)",
    "language": "Yoruba",
    "publicDomain": false,
    "notice": "Scripture quotations taken from the Yoruba Bible Crowther Version © The Bible Society of Nigeria, 2012"
  }
]

const publicDomain = rows.filter((r) => r.publicDomain)
const copyrighted = rows.filter((r) => !r.publicDomain)
const publicDomainCount = publicDomain.length

// Link each publisher's permissions page here as you confirm it, keyed by id.
const policyUrls: Record<string, string> = {}

const basis = (r: BibleRow) =>
  r.publicDomain ? "Public domain" : "Publisher's free-use policy"

useHead({
  title: "Content and Licences | Cloud of Worship",
})
useSeoMeta({
  title: "Content and Licences | Cloud of Worship",
  ogTitle: "Content and Licences | Cloud of Worship",
  description:
    "Where the Bibles, hymns, and songs in Cloud of Worship come from, who owns them, and how rights holders can reach us.",
  ogDescription:
    "Where the Bibles, hymns, and songs in Cloud of Worship come from, who owns them, and how rights holders can reach us.",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/content-licenses",
  ogType: "website",
  ogLocale: "en_US",
})

onMounted(() => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
})
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bolder;
}

main h2 {
  font-size: 250%;
  line-height: 120%;
  margin-bottom: 1%;
  margin-top: 3%;
}

main h3 {
  font-size: 190%;
  line-height: 120%;
  margin-bottom: 2%;
  margin-top: 2%;
}

main p {
  margin-bottom: 2%;
}

main ul {
  list-style-type: disc;
  margin-left: 2%;
  margin-bottom: 2%;
}

.table-wrap {
  overflow-x: auto;
  margin-bottom: 3%;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 90%;
}

th,
td {
  text-align: left;
  vertical-align: top;
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.25);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid var(--primary-color);
  font-weight: bold;
}
</style>
