<script setup lang="ts">
import { ref } from 'vue'


const brandData = ref([
  {
    ID: "001",
    RoomNum: '14',
    Roomsize: "Queen Size",
    Hours: '6hrs',
    Timein: "6:00",
    Timeout: "12:00"
  },
  
])
</script>

<template>
  <div
    class="mx-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Occupied ROoms</h4>

    <div class="flex flex-col">
      <div class="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
        <div class="p-2.5 xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Room ID</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Room Number</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Room Size</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Hours</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Time In</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Time Out</h5>
        </div>
      </div>

      <div class="overflow-y-auto max-h-[300px]">
        <div
          v-for="(brand, key) in brandData"
          :key="key"
          :class="`grid grid-cols-6 ${
            key === brandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
          }`"
        >
          <div class="flex items-center gap-3 p-2.5 xl:p-5">
            <p class="text-black dark:text-white">{{ brand.ID }}</p>
          </div>

          <div class="flex items-center justify-center p-2.5 xl:p-5">
            <p class="text-black dark:text-white">{{ brand.RoomNum }}</p>
          </div>

          <div class="flex items-center justify-center p-2.5 xl:p-5">
            <p class="text-black dark:text-white">{{ brand.Roomsize }}K</p>
          </div>

          <div class="flex items-center justify-center p-2.5 xl:p-5">
            <p class="text-meta-3">{{ brand.Hours }}</p>
          </div>

          <div class="flex items-center justify-center p-2.5 xl:p-5">
            <p class="text-black dark:text-white">{{ brand.Timein }} AM</p>
          </div>

          <div class="flex items-center justify-center p-2.5 xl:p-5">
            <p class="text-meta-5">{{ brand.Timeout }} PM</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

