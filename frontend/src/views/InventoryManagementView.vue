<script setup lang="ts">
import { ref } from 'vue'
import InventoryManagement from '@/components/Inventory/InventoryManagement.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'


</script>

<template>
  <DefaultLayout>
 

    <div class="flex flex-col gap-5">

      <InventoryManagement />
    </div>
  </DefaultLayout>
</template>
