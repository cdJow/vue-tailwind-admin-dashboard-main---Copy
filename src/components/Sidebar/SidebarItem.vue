<template>
  <li>
    <router-link
      :to="item.route"
      @click="handleClick"
      class="group relative flex items-center gap-1.5 rounded-md px-2 font-medium text-white duration-300 ease-in-out hover:text-white"
      :class="{
        '!text-grey': item.label === sidebarStore.selected
      }"
    >
      <div v-html="item.icon" class=""></div>
      {{ item.label }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { defineProps } from 'vue'

const sidebarStore = useSidebarStore()

const props = defineProps<{
  item: {
    label: string;
    route: string;
    icon: string;
  },
  index: number
}>()

const handleClick = () => {
  sidebarStore.selected = sidebarStore.selected === props.item.label ? '' : props.item.label
}
</script>
