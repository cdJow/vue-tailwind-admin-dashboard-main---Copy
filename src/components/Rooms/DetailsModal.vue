
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  interface Room {
    roomNumber: string;
    roomSize: string;
    Description: string;
    // Add other room properties as needed
  }

    const props = defineProps<{ room: Room }>();
  </script>
  
  <!-- DetailsModal.vue -->
<template>
    <div class="modal fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div class="modal-content mx-auto mt-20 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div class="room-details mb-4">
            <p class="text-lg font-bold mb-2">Room Details</p>
            <p><strong>Description:</strong> {{ room.Description }}</p>
            <ul class="list-none p-0 m-0" v-if="room.roomNumber || room.roomSize">
              <li class="mb-2" v-if="room.roomNumber">Room Number: {{ room.roomNumber }}</li>
              <li class="mb-2" v-if="room.roomSize">Room Size: {{ room.roomSize }}</li>
              
            </ul>
          </div>
          <div class="mt-4">
            <button @click="$emit('close')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
  </template>
 
  
 