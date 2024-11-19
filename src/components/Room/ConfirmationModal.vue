<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <div class="flex justify-center items-center mb-4">
            <svg class="w-20 h-20" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
        </div>
        <p class="mb-4">{{ message }}</p>
        
        <div class="flex justify-center">
          <button @click="confirm()" class="bg-red mr-2 text-white rounded-full text-xs w-1/4 h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2">
            {{ confirmText }}
          </button>
          <button @click="cancel" class="bg-white text-gray-700 rounded-full text-xs w-1/4 h-10 flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 hover:border-gray-300 hover:border-2">
            Cancel
          </button>
        </div>
      
      
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        default: 'Are you sure you want to proceed?',
      },
      confirmText: {
        type: String,
        default: 'Yes',
      },
      cancelText: {
        type: String,
        default: 'No',
      },
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
      const confirm = () => emit('confirm');
      const cancel = () => emit('cancel');
  
      return { confirm, cancel };
    },
  });
  </script>
  
  <style scoped>
  /* No additional styling needed as Tailwind CSS classes handle the styling */
  </style>
  