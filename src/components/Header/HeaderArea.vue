<script setup lang="ts">

import DropdownUser from './DropdownUser.vue'
import DropdownNotification from './DropdownNotification.vue'

</script>
<template>
  <!-- Header Section -->
  <header
    class=" z-999 sticky top-0 bg-tranparent flex items-center justify-center   "
  >
    <div
      class="w-full max-w-xl rounded-3xl mx-9 sm:mx-6 md:mx-8 bg-gradient-to-r from-orange-500 to-red shadow-md px-4 py-3 sm:py-4 md:px-6 2xl:px-11 flex items-center justify-between transition-all duration-300"
    >
      <!-- Title Section -->
      <div>
        <h2
          class="  text-white sm:text-md md:text-xl  lg:text-3xl font-bold transition-all duration-300"
        >
          WoodLand Suite
        </h2>
      </div>
 <!-- Right Section: Home, Notifications, and User -->
 <div class="flex items-center gap-3 2xsm:gap-7">
  <!-- Home Icon -->
  <router-link
   :to="{ name: 'WebApp' }"
    class="flex items-center justify-center  bg-white rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    title="Home"
  >
  <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  width="20px" height="20px" viewBox="0 0 495.398 495.398"
  xml:space="preserve">
<g>
 <g>
   <g>
     <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
       v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
       c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
       c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
     <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
       c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
       c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
   </g>
 </g>
</g>
</svg>
  </router-link>

  <!-- Notification Dropdown -->
  <DropdownNotification />

  <!-- User Dropdown -->
  <DropdownUser />
</div>
</div>
</header>
</template>