
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  
  emits: ['confirm-booking', 'close'],
  setup(_, { emit }) {
    const fullName = ref('');
    const phoneNumber = ref('');
    const email = ref('');
    const checkOutTime = ref('');

    const submitBooking = () => {
      emit('confirm-booking', {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        checkOutTime: checkOutTime.value,
      });
      emit('close');
    };

    return {
      fullName,
      phoneNumber,
      email,
      checkOutTime,
      submitBooking,
    };
  },
});
</script>
<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-xl">
      <h1 class="text-lg font-semibold mb-4">Booking Form</h1>
      <div class="mb-2">
        <label class="block text-sm font-medium">Full Name</label>
        <input v-model="fullName" type="text" 
        class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Full Name"
              required
        />
      </div>
      <div class="mb-2">
        <label class="block text-sm font-medium">Phone Number</label>
        <input v-model="phoneNumber" type="text" 
        class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Phone Number"
        required
        />
      </div>
      <div class="mb-2">
        <label class="block text-sm font-medium">Email</label>
        <input v-model="email" type="email" 
        class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Email"
              required
         />
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button @click="$emit('close')" 
        class="bg-gray-300 px-4 py-2 rounded"
        >Cancel</button>
        <button @click="submitBooking" 
        class="bg-blue-500 text-white rounded-full text-xs w-1/5 h-10 flex items-center justify-center hover:bg-white hover:text-primary hover:border-primary hover:border-2" 
        >Confirm</button>
      </div>
    </div>
  </div>
</template>
