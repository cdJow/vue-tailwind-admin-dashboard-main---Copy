<script setup lang="ts">

import HeaderArea from '@/components/Header/HeaderArea.vue';


</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <HeaderArea />
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <slot></slot>
        </div>
      </main>
    
    </div>

  
</template>
