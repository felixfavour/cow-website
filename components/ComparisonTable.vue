<template>
  <div class="section page">
    <!-- HERO SECTION -->
    <div class="inner py-[10%] md:py-[5%]">
      <div
        class="texts max-w-full md:max-w-[65%] mb-[7.5%] md:mb-[3%]"
        v-if="$route.name === 'index'"
      >
        <h3 class="text-3xl md:text-5xl font-bold">
          You have not seen
          <span class="emphasis-text">anything like this</span> before.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium mt-[2%]">
          Here's how Cloud of Worship compares to other tools you might be
          familiar with.
        </p>
      </div>
      <div
        class="overflow-x-auto border-4 md:border-8 border-purple-100 rounded-[16px] md:rounded-[32px]"
      >
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr class="bg-purple-50">
              <th
                class="px-4 md:px-6 py-6 text-left text-purple-900 border-b-4 md:border-b-8 border-purple-100"
                v-for="(col, index) in columns"
                :key="index"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in tableData"
              :key="rowIndex"
              class="odd:bg-white even:bg-purple-50"
            >
              <td class="px-4 md:px-6 py-4 font-semibold">
                {{ row.feature }}
              </td>
              <td
                class="px-4 md:px-6 py-4"
                v-for="(value, colIndex) in row.values"
                :key="colIndex"
              >
                <span v-if="typeof value === 'boolean'">
                  <span v-if="value" class="text-green-600 inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <!-- Icon from BoxIcons by Atisa - https://creativecommons.org/licenses/by/4.0/ -->
                      <path
                        fill="currentColor"
                        d="m10 15.586l-3.293-3.293l-1.414 1.414L10 18.414l9.707-9.707l-1.414-1.414z"
                      />
                    </svg>
                    Yes
                  </span>
                  <span v-else class="text-red-500 inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <!-- Icon from BoxIcons by Atisa - https://creativecommons.org/licenses/by/4.0/ -->
                      <path
                        fill="currentColor"
                        d="m16.192 6.344l-4.243 4.242l-4.242-4.242l-1.414 1.414L10.535 12l-4.242 4.242l1.414 1.414l4.242-4.242l4.243 4.242l1.414-1.414L13.364 12l4.242-4.242z"
                      />
                    </svg>
                    No</span
                  >
                </span>
                <span v-else>{{ value }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const columns = [
  "Feature",
  "Cloud of Worship (Free)",
  "FreeShow (Free)",
  "EasyWorship (Paid)",
  "VideoPsalm (Paid)",
  "ProPresenter (Paid)",
]

const tableData = [
  {
    feature: "Pricing",
    values: [
      "Free",
      "Free",
      "Starts at $18/month",
      "One-time fee",
      "Starts at $399",
    ],
  },
  {
    feature: "Platform",
    values: [
      "Web-based (Works on Windows, Mac, Tablets, & Mobile)",
      "Windows, Mac",
      "Windows, Mac",
      "Windows, Mac",
      "Windows, Mac",
    ],
  },
  {
    feature: "Cloud-Based?",
    values: [true, false, false, false, false],
  },
  {
    feature: "Bible Integration",
    values: [true, "Limited", true, true, true],
  },
  {
    feature: "Media Support (Video & Images)",
    values: [true, true, true, true, true],
  },
  {
    feature: "Live Streaming",
    values: ["Sync Feature", false, true, false, true],
  },
  {
    feature: "Multi-Screen Support",
    values: [true, "Limited", true, true, "Advanced"],
  },
  {
    feature: "Ease of Use",
    values: [
      // "⭐⭐⭐⭐⭐ (Very Easy)",
      // "⭐⭐⭐⭐⭐ (Simple)",
      // "⭐⭐⭐ (Moderate)",
      // "⭐⭐⭐ (Basic)",
      // "⭐⭐⭐⭐⭐ (Feature-rich but Complex)",
      "Very Easy",
      "Simple",
      "Moderate",
      "Basic",
      "Feature-rich but Complex",
    ],
  },
  {
    feature: "Worship Lyrics Integration",
    values: [true, true, true, true, true],
  },
  {
    feature: "Custom Templates",
    values: [true, "Limited", true, "Limited", true],
  },
  {
    feature: "Team Collaboration",
    values: [true, false, false, false, false],
  },
  {
    feature: "Best For",
    values: [
      "Churches needing a free solution with cloud-based access & real-time sync benefit.",
      "Small churches needing a free solution",
      "Churches needing local media control",
      "Basic lyrics display",
      "Large churches with advanced presentation needs",
    ],
  },
]
</script>
