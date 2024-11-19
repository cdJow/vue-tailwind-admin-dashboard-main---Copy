<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';


interface Room {
  id: number;
  number: string;
  size: string;
  status: string;
  imageUrl?: string;
  amenities: Record<string, number>; // Store selected amenities with quantities
}

export default defineComponent({
  emits: ['update:modelValue', 'addRoom'],
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const currentStep = ref(1); // Track the current step

    // Room details fields
    const roomNumber = ref('');
    const roomSize = ref('');
    const roomStatus = ref('');
    const roomImage = ref<File | null>(null);
    const previewImage = ref<string | null>(null);

    // Modal state for adding amenities
    const isAmenitiesModalOpen = ref(false);
    const selectedAmenities = ref<Record<string, number>>({});
    const availableAmenities = ref([
      { name: 'Mattress', quantity: 10 },
      { name: 'Blankets', quantity: 15 },
      { name: 'Pillows', quantity: 20 },
      { name: 'Bed', quantity: 5 },
      { name: 'Curtains', quantity: 10 },
      { name: 'Chair', quantity: 8 },
      { name: 'Table', quantity: 12 },
      { name: 'TV', quantity: 5 },
      { name: 'AC', quantity: 3 },
      { name: 'Mirror', quantity: 10 },
      { name: 'Light Bulb', quantity: 30 },
    ]);

    const handleImageUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        roomImage.value = file;
        previewImage.value = URL.createObjectURL(file);
      }
    };

    const openAmenitiesModal = () => {
      isAmenitiesModalOpen.value = true;
    };

    const closeAmenitiesModal = () => {
      isAmenitiesModalOpen.value = false;
    };

    const addAmenities = () => {
      isAmenitiesModalOpen.value = false; // Close the modal after selecting amenities
    };

    const submitForm = () => {
      const newRoom: Room = {
        id: Date.now(),
        number: roomNumber.value,
        size: roomSize.value,
        status: roomStatus.value,
        imageUrl: previewImage.value,
        priceRanges: priceRanges.values,
        amenities: { ...selectedAmenities.value },
      };
      emit('addRoom', newRoom);
      closeModal();
    };

const priceRanges = [
  { duration: '6 hours', rate: 600 },
  { duration: '12 hours', rate: 800 },
  { duration: '24 hours', rate: 1000 },
];

    const closeModal = () => {
      roomNumber.value = '';
      roomSize.value = '';
      roomStatus.value = '';
      roomImage.value = null;
      previewImage.value = null;
      selectedAmenities.value = {};
      currentStep.value = 1;
      emit('update:modelValue', false); // Close the modal
    };  

    return {
      currentStep,
      roomNumber,
      roomSize,
      roomStatus,
      roomImage,
      previewImage,
      availableAmenities,
      selectedAmenities,
      isAmenitiesModalOpen,
      handleImageUpload,
      openAmenitiesModal,
      closeAmenitiesModal,
      addAmenities,
      submitForm,
      closeModal,
      priceRanges: {
        '6 hours': null,
        '12 hours': null,
        '24 hours': null
      } as { [key: string]: number | null },
    };
  },
});
</script>

<template>
  
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[600px] overflow-auto">
      <!-- Step Indicator -->
      <div class="flex justify-between bg-orange-500 text-slate-500 p-4 sm:p-5">
        <div :class="{'text-white font-bold': currentStep === 1}" class="text-xs sm:text-base">1. Add Room</div>
        <div :class="{'text-white font-bold': currentStep === 2}" class="text-xs sm:text-base">2. Assign Amenities</div>
        <div :class="{'text-white font-bold': currentStep === 3}" class="text-xs sm:text-base">3. Set Prices</div>
      </div>
<div>
  <div class=" p-4 sm:p-6">
    <!-- Step 1: Add New Room Form -->
    <div v-if="currentStep === 1">
      <h2 class="text-2xl font-bold mb-4">Add New Room</h2>
      <form @submit.prevent="currentStep = 2">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="roomNumber">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            v-model="roomNumber"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Room Number"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="roomSize">Room Size</label>
          <select
            id="roomSize"
            v-model="roomSize"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          >
            <option value="" disabled selected>Select size</option>
            <option value="Single Size Bed">Single Size Bed</option>
            <option value="Double Size Bed">Double Size Bed</option>
            <option value="Family Size Bed">Family Size Bed</option>
            <option value="Queen Size Bed">Queen Size Bed</option>
            <option value="VIP Size Bed">VIP Size Bed</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="roomStatus">Room Status</label>
          <select
            id="roomStatus"
            v-model="roomStatus"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="" disabled selected>Select Status</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="roomImage">Room Image</label>
          <input
            type="file"
            id="roomImage"
            @change="handleImageUpload"
            accept="image/*"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" alt="Room Preview" class="w-full rounded-lg"/>
          </div>
        </div>
        <div class="flex justify-between">
          <button type="button" @click="closeModal" class="bg-gray-300 px-4 py-2 rounded text-sm">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded text-sm">Next</button>
        </div>
      </form>
    </div>

    <!-- Step 2: Assign Amenities -->
    <div v-else-if="currentStep === 2">
      <h2 class="text-2xl font-bold mb-4">Assign Amenities</h2>
      <button @click="openAmenitiesModal" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 text-sm">Add Amenities</button>
      <ul>
        <li v-for="(quantity, name) in selectedAmenities" :key="name">
          {{ name }}: {{ quantity }}
        </li>
      </ul>
      <div class="flex justify-between mt-4">
        <button @click="currentStep = 1" class="bg-gray-300 px-4 py-2 rounded text-sm">Back</button>
        <button @click="currentStep = 3" class="bg-blue-500 text-white px-4 py-2 rounded text-sm">Next</button>
      </div>
    </div>

    <!-- Step 3: Set Price Ranges -->
    <div v-else-if="currentStep === 3">
      <h2 class="text-2xl font-bold mb-4">Set Price Ranges</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="price6hrs">Price for 6 Hours</label>
          <input
            type="number"
            id="price6hrs"
            v-model.number="priceRanges['6 hours']"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter price for 6 hours"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="price12hrs">Price for 12 Hours</label>
          <input
            type="number"
            id="price12hrs"
            v-model.number="priceRanges['12 hours']"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter price for 12 hours"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="price24hrs">Price for 24 Hours</label>
          <input
            type="number"
            id="price24hrs"
            v-model.number="priceRanges['24 hours']"
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Enter price for 24 hours"
            required
          />
        </div>
        <div class="flex justify-between">
          <button type="button" @click="currentStep = 2" class="bg-gray-300 px-4 py-2 rounded text-sm">Back</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded text-sm">Finish</button>
        </div>
      </form>
    </div>
  </div>
</div>
      

      <!-- Modal for Selecting Amenities -->
      <div v-if="isAmenitiesModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-4 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/3 max-h-[600px] overflow-auto">
          <h2 class="text-xl font-bold mb-4">Select Amenities</h2>
          <div v-for="amenity in availableAmenities" :key="amenity.name" class="mb-2">
            <label :for="amenity.name" class="block text-sm font-medium">{{ amenity.name }}</label>
            <input
              type="number"
              :id="amenity.name"
              v-model.number="selectedAmenities[amenity.name]"
              :max="amenity.quantity"
              min="0"
              class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              placeholder="Quantity"
            />
          </div>
          <div class="flex justify-between mt-4">
            <button @click="closeAmenitiesModal" class="bg-gray-300 px-4 py-2 rounded text-sm">Cancel</button>
            <button @click="addAmenities" class="bg-blue-500 text-white px-4 py-2 rounded text-sm">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

