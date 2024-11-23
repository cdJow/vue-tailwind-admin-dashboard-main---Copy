<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import RoomList from '@/components/Room/RoomList.vue';

</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-9xl">
    
      <RoomList/>
    </div>
  </DefaultLayout>
</template>
