<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RoomManager from '@/components/Rooms/RoomManager.vue';

const pageTitle = ref('Room Management')
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-9xl">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <RoomManager/>
    </div>
  </DefaultLayout>
</template>
