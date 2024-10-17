<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import ChartOne from '@/components/Charts/ChartOne.vue'

import ChartTwo from '@/components/Charts/ChartTwo.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

</script>

<template>
  <DefaultLayout>
    <div >
      <DataStatsOne />
    </div>

    <div class="mt-2 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Chart One Start -->
      <ChartOne />
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <ChartTwo />
      <!-- ====== Chart Two End -->

      
    </div>
  </DefaultLayout>
</template>
