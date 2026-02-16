<template>
  <div v-if="!loading && !error" class="section page">
    <!-- HERO SECTION -->
    <div class="inner py-[10%] md:py-[5%]">
      <div
        class="texts max-w-full md:max-w-[65%] mb-[7.5%] md:mb-[3%]"
        :class="{ 'md:max-w-full text-center': $route.name === 'pricing' }"
        v-if="$route.name === 'index' || $route.name === 'pricing'"
      >
        <h3 class="text-3xl md:text-5xl font-bold">
          Cloud of Worship <span class="emphasis-text">Pricing</span>
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium mt-[2%]">
          For churches that need simple, reliable worship media — Free to start.
          No hidden fees.
        </p>
      </div>
      <div
        class="overflow-x-auto border-4 md:border-8 border-purple-100 rounded-[16px] md:rounded-[32px]"
      >
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr class="bg-purple-50">
              <th
                class="px-4 md:px-6 py-8 text-left text-purple-900 border-b-4 md:border-b-8 border-purple-100 font-bold align-top"
                v-for="(col, index) in columns"
                :key="index"
              >
                <div v-if="index === 0" class="text-lg md:text-xl">
                  {{ col }}
                </div>
                <div v-else class="flex flex-col gap-4 items-center">
                  <div class="flex flex-col gap-2 w-full">
                    <div class="text-xl md:text-2xl font-bold">{{ col }}</div>
                    <div class="text-sm md:text-base font-normal text-gray-600">
                      {{ planData[index - 1].description }}
                    </div>
                  </div>

                  <!-- Price Display -->
                  <div class="flex flex-col gap-2 my-2 w-full">
                    <div class="flex items-baseline gap-1">
                      <span
                        class="text-3xl md:text-4xl font-bold text-purple-900"
                      >
                        {{ planData[index - 1].symbol
                        }}{{ planData[index - 1].integer }}
                      </span>
                      <span
                        v-if="planData[index - 1].decimal"
                        class="text-xl md:text-2xl font-bold text-purple-900"
                      >
                        .{{ planData[index - 1].decimal }}
                      </span>
                      <span class="text-sm md:text-base text-gray-600 ml-1">
                        {{ planData[index - 1].period }}
                      </span>
                    </div>
                  </div>

                  <!-- Get Started Button -->
                  <div class="w-full">
                    <a
                      :href="planData[index - 1].url"
                      target="_blank"
                      :class="[
                        'max-w-[230px] w-full border-btn text-center text-sm md:text-base py-2 md:py-3',
                        index === 2 ? 'shake-btn' : '',
                      ]"
                    >
                      {{ planData[index - 1].buttonText }}
                    </a>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in tableData"
              :key="rowIndex"
              class="odd:bg-white even:bg-purple-50"
            >
              <td class="px-4 md:px-6 py-4 font-semibold align-top">
                {{ row.category }}
              </td>
              <td
                class="px-4 md:px-6 py-4 align-top"
                v-for="(plan, colIndex) in row.plans"
                :key="colIndex"
              >
                <div v-if="Array.isArray(plan)" class="space-y-2">
                  <div
                    v-for="(item, idx) in plan"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <span class="text-purple-600 mt-1">•</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
                <span v-else-if="typeof plan === 'boolean'">
                  <span
                    v-if="plan"
                    class="text-green-600 inline-flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m10 15.586l-3.293-3.293l-1.414 1.414L10 18.414l9.707-9.707l-1.414-1.414z"
                      />
                    </svg>
                    Yes
                  </span>
                  <span
                    v-else
                    class="text-gray-400 inline-flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m16.192 6.344l-4.243 4.242l-4.242-4.242l-1.414 1.414L10.535 12l-4.242 4.242l1.414 1.414l4.242-4.242l4.243 4.242l1.414-1.414L13.364 12l4.242-4.242z"
                      />
                    </svg>
                    No
                  </span>
                </span>
                <span v-else>{{ plan }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-else-if="loading"
    class="section page min-h-[400px] flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"
      ></div>
      <p class="mt-4 text-lg text-gray-600 font-medium">Loading pricing...</p>
    </div>
  </div>

  <!-- Error State -->
  <div
    v-else-if="error"
    class="section page min-h-[400px] flex items-center justify-center"
  >
    <div class="text-center max-w-md mx-auto p-8">
      <p class="text-red-600 mb-4">{{ error.message || error }}</p>
      <button
        @click="fetchPlans()"
        class="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
</template>

<script setup>
const selectedCurrency = ref("USD") // Default to USD

// Fetch plans from API using useAsyncData
const {
  data: apiPlans,
  pending: loading,
  error,
  refresh: fetchPlans,
} = await useAsyncData(
  "pricing-table-plans",
  async () => {
    try {
      const apiUrl =
        process.env.NUXT_PUBLIC_API_URL || "https://api.cloudofworship.com"
      const response = await fetch(`${apiUrl}/api/v1/subscriptions/plans`)

      if (!response.ok) {
        throw new Error("Failed to fetch pricing plans")
      }

      const { data } = await response.json()
      return data || []
    } catch (err) {
      console.error("Error fetching plans:", err)
      throw err
    }
  },
  {
    default: () => [],
    server: true,
    lazy: false,
  }
)

// Detect user's country using timezone-based detection
const detectUserLocation = async () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // African timezones (excluding South Africa)
    const africanTimezones = [
      "Africa/Lagos",
      "Africa/Accra",
      "Africa/Nairobi",
      "Africa/Cairo",
      "Africa/Addis_Ababa",
      "Africa/Dar_es_Salaam",
      "Africa/Kampala",
      "Africa/Khartoum",
      "Africa/Kinshasa",
      "Africa/Luanda",
      "Africa/Algiers",
      "Africa/Casablanca",
      "Africa/Tunis",
      "Africa/Abidjan",
      "Africa/Bamako",
      "Africa/Dakar",
      "Africa/Douala",
      "Africa/Harare",
      "Africa/Lusaka",
      "Africa/Maputo",
      "Africa/Tripoli",
      "Africa/Windhoek",
    ]

    if (africanTimezones.includes(timezone)) {
      if (availableCurrencies.value.includes("NGN")) {
        selectedCurrency.value = "NGN"
      }
      return
    }

    // Try to get more accurate location using a free IP geolocation API
    const response = await fetch("https://ipapi.co/json/")
    if (response.ok) {
      const data = await response.json()

      // List of African country codes (excluding South Africa)
      const africanCountries = [
        "NG",
        "GH",
        "KE",
        "EG",
        "ET",
        "TZ",
        "UG",
        "SD",
        "CD",
        "AO",
        "DZ",
        "MA",
        "TN",
        "CI",
        "ML",
        "SN",
        "CM",
        "ZW",
        "ZM",
        "MZ",
        "LY",
        "NA",
        "BF",
        "BJ",
        "TG",
        "RW",
        "BI",
        "SO",
        "SL",
        "LR",
        "GM",
        "GN",
        "MW",
        "MG",
        "GA",
        "CG",
        "TD",
        "NE",
        "MR",
        "CF",
        "ER",
        "DJ",
      ]

      // Show NGN to African countries (except South Africa)
      if (
        africanCountries.includes(data.country_code) &&
        availableCurrencies.value.includes("NGN")
      ) {
        selectedCurrency.value = "NGN"
      } else if (data.country_code === "ZA") {
        // South Africa gets USD or GBP
        if (availableCurrencies.value.includes("USD")) {
          selectedCurrency.value = "USD"
        } else if (availableCurrencies.value.includes("GBP")) {
          selectedCurrency.value = "GBP"
        }
      } else if (
        data.country_code === "GB" &&
        availableCurrencies.value.includes("GBP")
      ) {
        selectedCurrency.value = "GBP"
      } else if (availableCurrencies.value.includes("USD")) {
        selectedCurrency.value = "USD"
      } else if (availableCurrencies.value.length > 0) {
        selectedCurrency.value = availableCurrencies.value[0]
      }
    }
  } catch (err) {
    console.log("Location detection failed")
    // Default to USD or first available currency
    if (availableCurrencies.value.includes("USD")) {
      selectedCurrency.value = "USD"
    } else if (availableCurrencies.value.length > 0) {
      selectedCurrency.value = availableCurrencies.value[0]
    }
  }
}

// Helper function to convert amounts based on currency
const getAmount = (plan) => {
  if (!plan) return 0

  // Convert based on currency
  if (plan.currency === "NGN" && plan.amountKobo) {
    return plan.amountKobo / 100 // Convert kobo to Naira
  } else if (plan.currency === "USD" && plan.amountCents) {
    return plan.amountCents / 100 // Convert cents to USD
  } else if (plan.currency === "GBP" && plan.amountCents) {
    return plan.amountCents / 100 // Convert pence to GBP
  }

  return 0
}

// Get available currencies from API plans
const availableCurrencies = computed(() => {
  const currencies = new Set()
  if (apiPlans.value) {
    apiPlans.value.forEach((plan) => {
      if (plan.currency) {
        currencies.add(plan.currency)
      }
    })
  }
  return Array.from(currencies)
})

const getCurrencySymbol = (currency) => {
  const symbols = {
    USD: "$",
    NGN: "₦",
    GBP: "£",
  }
  return symbols[currency] || currency
}

const getPriceInteger = (amount) => {
  return Math.floor(amount).toLocaleString()
}

const getPriceDecimal = (amount) => {
  const decimalPart = (amount % 1).toFixed(2).substring(2)
  return decimalPart !== "00" ? decimalPart : null
}

// Get Teams plan for the selected currency (monthly)
const teamsMonthlyPlan = computed(() => {
  if (!apiPlans.value) return null

  return apiPlans.value.find(
    (p) =>
      p.alias?.toLowerCase().includes("monthly") &&
      p.currency === selectedCurrency.value
  )
})

const columns = ["Plan", "Starter", "Teams"]

// Plan data computed based on API response
const planData = computed(() => {
  const starterData = {
    description: "For churches with a single steward",
    symbol: getCurrencySymbol(selectedCurrency.value),
    integer: "0",
    decimal: null,
    period: "/month",
    buttonText: "Get Started",
    url: "https://app.cloudofworship.com/signup",
  }

  const teamsData = {
    description:
      "For churches needing collaboration tools for multiple stewards",
    symbol: getCurrencySymbol(selectedCurrency.value),
    integer: "0",
    decimal: null,
    period: "/month",
    buttonText: "Start with Teams",
    url: "https://app.cloudofworship.com/signup",
  }

  if (teamsMonthlyPlan.value) {
    const amount = getAmount(teamsMonthlyPlan.value)
    teamsData.symbol = getCurrencySymbol(teamsMonthlyPlan.value.currency)
    teamsData.integer = getPriceInteger(amount)
    teamsData.decimal = getPriceDecimal(amount)
    teamsData.url = `https://app.cloudofworship.com/signup?plan_id=${teamsMonthlyPlan.value.alias}`
  }

  return [starterData, teamsData]
})

const tableData = [
  {
    category: "Best For",
    plans: [
      "Churches with a single steward",
      "Churches needing collaboration tools for multiple stewards",
    ],
  },
  {
    category: "Bible Access",
    plans: [
      [
        "Display passages offline",
        "Full-text Bible search offline",
        "Multiple translations (English, Spanish, Igbo, Yoruba, Hausa, etc)",
        "Quick scripture lookup (e.g., Gen 1:1)",
      ],
      ["Everything in Starter plus", "AI scripture display"],
    ],
  },
  {
    category: "Hymns & Lyrics",
    plans: [
      ["Add & display your own song lyrics"],
      [
        "Everything in Starter plus",
        "1,000+ hymns offline",
        "Access growing library (9,000+ songs)",
        "Personal library to save songs & slides",
        "Create dynamic text slides",
      ],
    ],
  },
  {
    category: "Media Support",
    plans: [
      [
        "Slide backgrounds",
        "Slide modifications: blur, brightness, font styles",
        "Slide, lyrics, and verse transitions",
        "Live output display",
        "Media playback controls",
      ],
      [
        "Everything in Starter plus",
        "Add images, audio, local & external videos (YouTube/Vimeo)",
        "Slide overlays (snow, confetti, etc.)",
        "Banners & alerts",
        "Dynamic countdown slides",
      ],
    ],
  },
  {
    category: "Collaboration",
    plans: [
      ["Live editing across multiple devices", "Real-time sync"],
      [
        "Everything in Starter plus",
        "Workspace invitations for team members",
        "Save multiple service schedules & access previous schedules",
        "Livestream URL for OBS, vMix & streaming software",
      ],
    ],
  },
  {
    category: "Features & Tools",
    plans: [
      [
        "Quick actions to access all features",
        "Light/dark mode",
        "Customer support",
        "Community access",
        "Auto-sync with cloud",
        "Frequent updates",
        "Free storage (up to 100MB)",
      ],
      ["Everything in Starter plus", "Free storage up to 5GB"],
    ],
  },
]

// Auto-detect location after data is loaded
onMounted(() => {
  if (apiPlans.value && apiPlans.value.length > 0) {
    detectUserLocation()
  }
})
</script>

<style scoped>
/* Preserve line breaks in multi-line text */
td {
  white-space: pre-line;
}

/* Shake animation for the Teams button */
.shake-btn {
  animation: shake 0.5s ease-in-out 5s infinite;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0) scale(1);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px) scale(1.01);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px) scale(1.01);
  }
}

/* Pause shake animation on hover */
.shake-btn:hover {
  animation-play-state: paused;
}
</style>
