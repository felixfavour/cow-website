<template>
  <component :is="icon" :size="size" :weight="weight" aria-hidden="true" />
</template>

<script setup lang="ts">
/**
 * Phosphor icon by kebab-case name, so categories can declare `icon: "rocket-launch"`
 * in frontmatter. Add new names to ICONS as the content bank grows.
 */
import {
  PhRocketLaunch,
  PhSquaresFour,
  PhListChecks,
  PhBroadcast,
  PhUsersThree,
  PhGearSix,
  PhWrench,
  PhKeyboard,
  PhCreditCard,
  PhLightning,
  PhHouse,
  PhMagnifyingGlass,
  PhLightbulb,
  PhStar,
  PhWarning,
  PhCheckCircle,
  PhMonitorPlay,
  PhBookOpen,
  PhFileText,
} from '@phosphor-icons/vue'

const ICONS: Record<string, any> = {
  'rocket-launch': PhRocketLaunch,
  'squares-four': PhSquaresFour,
  'list-checks': PhListChecks,
  broadcast: PhBroadcast,
  'users-three': PhUsersThree,
  'gear-six': PhGearSix,
  wrench: PhWrench,
  keyboard: PhKeyboard,
  'credit-card': PhCreditCard,
  lightning: PhLightning,
  house: PhHouse,
  'magnifying-glass': PhMagnifyingGlass,
  lightbulb: PhLightbulb,
  star: PhStar,
  warning: PhWarning,
  'check-circle': PhCheckCircle,
  'monitor-play': PhMonitorPlay,
  'book-open': PhBookOpen,
  'file-text': PhFileText,
}

const props = withDefaults(
  defineProps<{
    name?: string
    size?: number | string
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  }>(),
  { name: 'file-text', size: 24, weight: 'duotone' }
)

const icon = computed(() => ICONS[props.name ?? ''] ?? PhFileText)
</script>
