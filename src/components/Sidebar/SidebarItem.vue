<template>
  <li>
    <router-link
      :to="item.route"
      @click="handleClick"
      class=" flex items-center gap-2 rounded-md px-2 font-medium text-white duration-300 ease-in-out hover:text-green"
    >
      <!-- Icon with responsive size -->
      <div v-html="item.icon" class="flex-shrink-0 w-6 h-6 md:w-8 md:h-8"></div>

      <!-- Text label that is hidden on small screens -->
      <span class="hidden md:inline-block truncate leading-none">{{ item.label }}</span>

    </router-link>
  </li>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { defineProps } from 'vue'

const sidebarStore = useSidebarStore()

const props = defineProps<{
  item: {
    label: string
    route: string
    icon: string
  }
  index: number
}>()

const handleClick = () => {
  sidebarStore.selected =
    sidebarStore.selected === props.item.label ? '' : props.item.label
}
</script>
