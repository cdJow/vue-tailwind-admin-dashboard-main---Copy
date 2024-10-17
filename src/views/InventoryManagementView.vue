<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import InventoryManagement from '@/components/Inventory/InventoryManagement.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Inventory')

</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle"  />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">

      <InventoryManagement />
    </div>
  </DefaultLayout>
</template>
