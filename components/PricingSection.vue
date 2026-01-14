<template>
  <div v-if="!loading && !error" class="section page">
    <div class="inner py-[5%] md:py-[2%]">
      <!-- Gospel Impact Disclaimer -->
      <div
        class="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 md:p-6"
      >
        <div class="flex items-start gap-3">
          <svg
            class="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <div>
            <h4 class="font-bold text-purple-900 mb-1">
              Ends of The Earth Initiative
            </h4>
            <p class="text-sm text-gray-700">
              <strong>90% of profits</strong> from Teams plan sales go directly
              to efforts pushing the gospel forward in churches across Africa
              and other regions. Your subscription helps equip ministries with
              the tools they need to spread the good news.
            </p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div
        class="flex flex-col md:flex-row items-center justify-between max-w-[900px] mx-auto gap-6 mb-12"
      >
        <div></div>
        <!-- Billing Toggle -->
        <div class="flex items-center gap-3 bg-purple-50 rounded-full p-1">
          <button
            @click="billingCycle = 'monthly'"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              billingCycle === 'monthly'
                ? 'bg-purple-600 text-white'
                : 'text-purple-900 hover:text-purple-600',
            ]"
          >
            Monthly
          </button>
          <button
            @click="billingCycle = 'yearly'"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2',
              billingCycle === 'yearly'
                ? 'bg-purple-600 text-white'
                : 'text-purple-900 hover:text-purple-600',
            ]"
          >
            Annually
            <span
              v-if="currentDiscount"
              class="text-xs bg-accent-color px-2 py-0.5 rounded-full"
            >
              {{ currentDiscount }} OFF
            </span>
          </button>
        </div>

        <!-- Currency Selector -->
        <div v-if="availableCurrencies.length > 0" class="relative">
          <select
            v-model="selectedCurrency"
            class="appearance-none bg-purple-50 rounded-full px-4 py-2 pr-10 font-medium text-purple-900 cursor-pointer focus:outline-none focus:border-purple-600 transition-colors"
          >
            <option
              v-for="currency in availableCurrencies"
              :key="currency"
              :value="currency"
            >
              {{ currency }} ({{ getCurrencySymbol(currency) }})
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-600"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div
          v-for="(plan, planKey) in plans"
          :key="plan.id || planKey"
          :class="[
            'pricing-card rounded-2xl p-8 relative overflow-hidden transition-all',
            plan.highlighted
              ? 'bg-gradient-to-br from-purple-50 to-white border border-purple-400 hover:border-purple-600 shadow-lg'
              : 'bg-white border border-purple-100 hover:border-purple-300',
            isChangingPrice ? 'price-blur-out' : 'price-blur-in',
          ]"
        >
          <div class="top-area h-[300px] flex flex-col justify-between">
            <div class="top-area-1">
              <!-- Recommended Badge -->
              <div
                v-if="plan.highlighted"
                class="absolute top-0 right-0 bg-[#FF8980] text-white px-6 py-1 rounded-bl-2xl font-medium text-sm"
              >
                Recommended for 300+ congregants
              </div>

              <div :class="['mb-6', plan.highlighted ? 'mt-6' : '']">
                <h3 class="text-2xl font-bold text-purple-900 mb-2">
                  {{ plan.name }}
                </h3>
                <p class="text-gray-600">
                  {{ plan.description }}
                </p>
              </div>

              <div class="mb-6">
                <div class="flex items-baseline gap-2">
                  <div class="flex items-start text-purple-900">
                    <span class="text-5xl font-bold">
                      {{ getCurrencySymbol(plan.currency || selectedCurrency)
                      }}{{ getPriceInteger(plan) }}
                    </span>
                    <span
                      v-if="getPriceDecimal(plan)"
                      class="text-2xl font-bold pt-1"
                    >
                      .{{ getPriceDecimal(plan) }}
                    </span>
                  </div>
                  <span class="text-gray-600"
                    >/{{
                      plan.interval === "yearly" || billingCycle === "yearly"
                        ? "year"
                        : "month"
                    }}</span
                  >
                </div>
                <p
                  v-if="
                    !plan.isFree &&
                    billingCycle === 'yearly' &&
                    calculateSavings(plan) !== '0'
                  "
                  class="text-sm text-green-600 mt-2"
                >
                  Save {{ getCurrencySymbol(plan.currency || selectedCurrency)
                  }}{{ calculateSavings(plan) }} per year
                </p>
              </div>
            </div>

            <a
              :href="getPlanUrl(plan)"
              target="_blank"
              :class="[
                'w-full border-btn mb-6',
                plan.highlighted ? 'shake-btn' : '',
              ]"
            >
              {{ plan.highlighted ? "Start with Teams" : "Get started" }}
            </a>
          </div>

          <div class="space-y-3">
            <p class="font-semibold text-purple-900 mb-4">What's included:</p>
            <div
              v-for="(feature, index) in plan.features"
              :key="index"
              class="flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span class="text-sm text-gray-700">{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="text-center mt-12 max-w-2xl mx-auto">
        <p class="text-gray-600">
          Need something more? <br />
          <NuxtLink
            to="/contact"
            class="text-purple-600 font-semibold hover:underline"
          >
            Contact us
          </NuxtLink>
          for custom enterprise solutions tailored to your church's needs.
        </p>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-else-if="loading"
    class="section page min-h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"
      ></div>
      <p class="mt-6 text-xl text-gray-600 font-medium">
        Loading pricing plans...
      </p>
    </div>
  </div>

  <!-- Error State -->
  <div
    v-else-if="error"
    class="section page min-h-screen flex items-center justify-center"
  >
    <div class="text-center max-w-md mx-auto p-8">
      <svg
        class="w-16 h-16 text-red-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 class="text-xl font-bold text-gray-900 mb-2">
        Unable to load pricing
      </h3>
      <p class="text-red-600 mb-4">{{ error.message || error }}</p>
      <p class="text-gray-600 mb-6">
        Please check your connection and try again.
      </p>
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
const billingCycle = ref("monthly")
const selectedCurrency = ref("USD") // Default to USD
const isChangingPrice = ref(false)
const userCountry = ref(null)

// Static free plan
const freePlan = {
  id: "FREE",
  name: "Starter",
  description: "For churches with a single steward.",
  amount: 0.0,
  currency: "",
  interval: "monthly",
  features: [
    "Display Bible passages",
    "Access over 1,000+ hymns offline",
    "Add & display your own song lyrics",
    "100% offline functionality",
    "Full text search of the entire Bible offline",
    "Multiple Bible translations (incl. Spanish, Igbo, Yoruba, Hausa)",
    "Quick scripture lookup (e.g., Gen 1:1)",
    "Schedule management",
    "Live editing across multiple devices",
    "Various slide backgrounds",
    "Various slide modifications: blur, brightness, font styles, and more",
    "Slide, lyrics, and verse transitions",
    "Live output display",
    "Media playback controls",
    "Quick actions to access every feature in one place",
    "Real-time synchronization",
    "Light/dark mode support",
    "Customer support",
    "Growing community",
    "Auto-sync with cloud",
    "Frequent updates (view changelog)",
    "Free storage (up to 100MB)",
  ],
  highlighted: false,
  isFree: true,
}

// Fetch plans from API using useAsyncData
const {
  data: apiPlans,
  pending: loading,
  error,
  refresh: fetchPlans,
} = await useAsyncData(
  "pricing-plans",
  async () => {
    try {
      // Use environment variable or default to localhost
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
      "Africa/Lagos",      // Nigeria
      "Africa/Accra",      // Ghana
      "Africa/Nairobi",    // Kenya
      "Africa/Cairo",      // Egypt
      "Africa/Addis_Ababa", // Ethiopia
      "Africa/Dar_es_Salaam", // Tanzania
      "Africa/Kampala",    // Uganda
      "Africa/Khartoum",   // Sudan
      "Africa/Kinshasa",   // DR Congo
      "Africa/Luanda",     // Angola
      "Africa/Algiers",    // Algeria
      "Africa/Casablanca", // Morocco
      "Africa/Tunis",      // Tunisia
      "Africa/Abidjan",    // Ivory Coast
      "Africa/Bamako",     // Mali
      "Africa/Dakar",      // Senegal
      "Africa/Douala",     // Cameroon
      "Africa/Harare",     // Zimbabwe
      "Africa/Lusaka",     // Zambia
      "Africa/Maputo",     // Mozambique
      "Africa/Tripoli",    // Libya
      "Africa/Windhoek",   // Namibia
    ]
    
    // South African timezones (should use USD/GBP, not NGN)
    const southAfricanTimezones = ["Africa/Johannesburg"]

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
      userCountry.value = data.country_code
      
      // List of African country codes (excluding South Africa)
      const africanCountries = [
        "NG", // Nigeria
        "GH", // Ghana
        "KE", // Kenya
        "EG", // Egypt
        "ET", // Ethiopia
        "TZ", // Tanzania
        "UG", // Uganda
        "SD", // Sudan
        "CD", // DR Congo
        "AO", // Angola
        "DZ", // Algeria
        "MA", // Morocco
        "TN", // Tunisia
        "CI", // Ivory Coast
        "ML", // Mali
        "SN", // Senegal
        "CM", // Cameroon
        "ZW", // Zimbabwe
        "ZM", // Zambia
        "MZ", // Mozambique
        "LY", // Libya
        "NA", // Namibia
        "BF", // Burkina Faso
        "BJ", // Benin
        "TG", // Togo
        "RW", // Rwanda
        "BI", // Burundi
        "SO", // Somalia
        "SL", // Sierra Leone
        "LR", // Liberia
        "GM", // Gambia
        "GN", // Guinea
        "MW", // Malawi
        "MG", // Madagascar
        "GA", // Gabon
        "CG", // Congo
        "TD", // Chad
        "NE", // Niger
        "MR", // Mauritania
        "CF", // Central African Republic
        "ER", // Eritrea
        "DJ", // Djibouti
      ]

      // Show NGN to African countries (except South Africa)
      if (africanCountries.includes(data.country_code) && availableCurrencies.value.includes("NGN")) {
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
  if (plan.isFree) return 0

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

// Determine billing interval from tier name
const getBillingInterval = (tier) => {
  if (!tier) return "monthly"
  const lowerTier = tier.toLowerCase()
  if (lowerTier.includes("annual") || lowerTier.includes("yearly")) {
    return "yearly"
  }
  return "monthly"
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

// Get current discount for the selected billing cycle
const currentDiscount = computed(() => {
  if (!apiPlans.value) return null

  // Calculate discount based on monthly vs yearly pricing
  const yearlyPlan = apiPlans.value.find(
    (p) =>
      getBillingInterval(p.alias) === "yearly" &&
      p.currency === selectedCurrency.value
  )
  const monthlyPlan = apiPlans.value.find(
    (p) =>
      getBillingInterval(p.alias) === "monthly" &&
      p.currency === selectedCurrency.value
  )

  if (yearlyPlan && monthlyPlan) {
    const yearlyAmount = getAmount(yearlyPlan)
    const monthlyAmount = getAmount(monthlyPlan)
    const yearlyEquivalent = monthlyAmount * 12
    const discount = Math.round(
      ((yearlyEquivalent - yearlyAmount) / yearlyEquivalent) * 100
    )
    return discount > 0 ? `${discount}%` : null
  }

  return null
})

// Combine free plan with filtered API plans
const plans = computed(() => {
  if (!apiPlans.value) return [freePlan]

  const filteredApiPlans = apiPlans.value.filter(
    (plan) =>
      getBillingInterval(plan.alias) === billingCycle.value &&
      plan.currency === selectedCurrency.value
  )

  // Get the Teams plan and mark it as highlighted
  const teamsPlans = filteredApiPlans.map((plan) => ({
    ...plan,
    name: "Teams",
    description:
      "For churches that need collaboration tools for multiple stewards.",
    highlighted: true,
    amount: getAmount(plan), // Add computed amount for easier access
    interval: getBillingInterval(plan.alias),
  }))

  return [freePlan, ...teamsPlans]
})

// Watch for changes in billing cycle or currency to trigger blur animation
watch([billingCycle, selectedCurrency], () => {
  triggerPriceChangeAnimation()
})

const triggerPriceChangeAnimation = () => {
  isChangingPrice.value = true
  setTimeout(() => {
    isChangingPrice.value = false
  }, 300)
}

const getCurrencySymbol = (currency) => {
  const symbols = {
    USD: "$",
    NGN: "₦",
    GBP: "£",
  }
  return symbols[currency] || currency
}

const getPriceInteger = (plan) => {
  if (plan.isFree) {
    return "0"
  }

  // Use the precomputed amount or calculate it
  const amount = plan.amount !== undefined ? plan.amount : getAmount(plan)
  return Math.floor(amount).toLocaleString()
}

const getPriceDecimal = (plan) => {
  if (plan.isFree) {
    return null
  }

  // Use the precomputed amount or calculate it
  const amount = plan.amount !== undefined ? plan.amount : getAmount(plan)
  const decimalPart = (amount % 1).toFixed(2).substring(2)
  return decimalPart !== "00" ? decimalPart : null
}

const calculateSavings = (plan) => {
  if (plan.isFree || billingCycle.value !== "yearly") {
    return "0"
  }

  if (!apiPlans.value) return "0"

  // Find the monthly plan for the same currency
  const monthlyPlan = apiPlans.value.find(
    (p) =>
      getBillingInterval(p.alias) === "monthly" &&
      p.currency === selectedCurrency.value
  )

  if (!monthlyPlan) {
    return "0"
  }

  const monthlyAmount = getAmount(monthlyPlan)
  const yearlyAmount = plan.amount !== undefined ? plan.amount : getAmount(plan)
  const monthlyTotal = monthlyAmount * 12
  const savings = monthlyTotal - yearlyAmount
  return savings > 0 ? savings.toLocaleString() : "0"
}

const getPlanUrl = (plan) => {
  if (plan.isFree) {
    return "https://app.cloudofworship.com/signup"
  }
  return `https://app.cloudofworship.com/plan_id=${plan.alias}`
}

// Auto-detect location after data is loaded
onMounted(() => {
  if (apiPlans.value && apiPlans.value.length > 0) {
    detectUserLocation()
  }
})
</script>

<style scoped>
.pricing-card {
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
}

/* Blur animations for price changes */
.price-blur-out {
  animation: blurOut 0.15s ease-out forwards;
}

.price-blur-in {
  animation: blurIn 0.15s ease-in forwards;
}

@keyframes blurOut {
  from {
    filter: blur(0px);
    opacity: 1;
  }
  to {
    filter: blur(10px);
    opacity: 0.7;
  }
}

@keyframes blurIn {
  from {
    filter: blur(10px);
    opacity: 0.7;
  }
  to {
    filter: blur(0px);
    opacity: 1;
  }
}

/* Shake animation for the Pro button */
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

.primary-btn {
  border-radius: 12px;
  background-color: var(--primary-color);
  color: white;
  height: 45px;
  padding: 0.75rem 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  font-weight: 600;
  transition: all 0.2s;
}

.primary-btn:hover {
  background-color: #7e22ce;
  transform: scale(1.02);
}

/* Pause shake animation on hover */
.shake-btn:hover {
  animation-play-state: paused;
}

.accent-color {
  background-color: var(--accent-color);
}
</style>
