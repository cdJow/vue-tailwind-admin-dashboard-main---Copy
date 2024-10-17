

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['close', 'submit']); // Define emitted events

const form = ref({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  roomNumber: '',
  roomType: '',
  checkInDate: '',
  checkOutDate: '',
  stayDuration: '',
  roomRates: ''
});

// Placeholder for available rooms
const availableRooms = ref([
  { number: '101', size: 'Single' },
  { number: '102', size: 'Double' },
  { number: '103', size: 'Suite' }
]);

// Handle form submission
const handleSubmit = () => {
  console.log(form.value);
  emit('submit', form.value); // Emit the form data on submit
  alert('Check-In form submitted successfully!');
};

// Close modal
const closeModal = () => {
  emit('close'); // Emit close event
  
};

// Fetch available rooms from your data source
onMounted(() => {
  // Simulate API call to fetch rooms
});
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="grid grid-cols-3 gap-6 bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
      <h2 class="col-span-3 text-2xl font-bold mb-6 text-center">Guest Check-In</h2>

      <form @submit.prevent="handleSubmit" class="col-span-3 grid grid-cols-3 gap-6">
        <!-- Personal Information Section -->
        <div class="col-span-3">
          <h3 class=" text-center text-lg font-semibold mb-4">Personal Information</h3>
          <div class="grid grid-cols-3 gap-6">
            <!-- First Name -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                v-model="form.firstName"
                class="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="John"
                required
              />
            </div>
            <!-- Last Name -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                v-model="form.lastName"
                class="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="Doe"
                required
              />
            </div>
            <!-- Phone Number -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                v-model="form.phoneNumber"
                class="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="+63 912 345 6789"
                required
              />
            </div>
          </div>
        </div>

        <!-- Room Information Section -->
        <div class="col-span-3">
          <h3 class=" text-center text-lg font-semibold mb-4">Room Information</h3>
          <div class="grid grid-cols-3 gap-6">
            <!-- Room Number (Dynamic) -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Room Number</label>
              <select v-model="form.roomNumber" class="w-full px-4 py-2 border rounded-lg text-sm" required>
                <option value="" disabled>Select room number</option>
                <option v-for="room in availableRooms" :key="room.number" :value="room.number">
                  {{ room.number }}
                </option>
              </select>
            </div>

            <!-- Room Type -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Room Type</label>
              <select v-model="form.roomType" class="w-full px-4 py-2 border rounded-lg text-sm" required>
                <option value="" disabled>Select room type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            <!-- Room Rates -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Room Rates (₱)</label>
              <input
                type="number"
                v-model="form.roomRates"
                class="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="Enter room rate"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 mt-4">
            <!-- Check-In Date -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Check-In Date</label>
              <input
                type="date"
                v-model="form.checkInDate"
                class="w-full px-4 py-2 border rounded-lg text-sm"
                required
              />
            </div>

            <!-- Check-Out Date -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Check-Out Date</label>
              <input
                type="date"
                v-model="form.checkOutDate"
                class="w-full px-4 py-2 border rounded-lg text-sm"
                required
              />
            </div>

            <!-- Stay Duration -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Stay Duration</label>
              <select v-model="form.stayDuration" class="w-full px-4 py-2 border rounded-lg text-sm" required>
                <option value="" disabled>Select stay duration</option>
                <option value="6hrs">6 hours</option>
                <option value="12hrs">12 hours</option>
                <option value="24hrs">24 hours</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="col-span-3 flex justify-between mt-8">
          <button
            type="button"
            @click="closeModal"
            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Confirm Check-In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

