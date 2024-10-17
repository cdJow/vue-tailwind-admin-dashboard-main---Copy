<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import CheckInModal from './CheckInModal.vue';
import DetailsModal from './DetailsModal.vue';
// Define types for props
interface NewRoom {
  roomNumber: string;
  roomSize: string;
  Description: string;
  filename: string; // Image filename
  Status: string;
  '1stfloor': boolean;
  '2ndfloor': boolean;
  '3rdfloor': boolean;
  '4thfloor': boolean;
  Mattress: string;
  Blankets: string;
  Pillows: string;
  Bed: string;
  Curtains: string;
  Table: string;
  Chair: string;
  TV: string;
  Lightbulb: string;
  AC: string;
  Mirror: string;
  Others: string;
  WifiStatus: string;
  BedQuantity: number;
  MattressQuantity: number;
  BlanketsQuantity: number; // This is fine now
  PillowsQuantity: number;
  CurtainsQuantity: number;
  TableQuantity: number;
  ChairQuantity: number;
  TVQuantity: number;
  LightbulbQuantity: number;
  ACQuantity: number;
  MirrorQuantity: number;
  [key: string]: string | boolean | number | undefined; // Updated index signature
}


const props = defineProps<{
  rooms: NewRoom[]; // Declare rooms prop to be of type NewRoom array
}>();

const emit = defineEmits<{
  (e: 'updateRooms', rooms: NewRoom[]): void; // Emit event to update rooms
}>();

const isCheckInModalVisible = ref(false);
const selectedRoom = ref<NewRoom | null>(null); // Track the currently selected room for details

// Method to open the modal
const openCheckInModal = () => {
  isCheckInModalVisible.value = true;
};

// Method to close the modal
const closeCheckInModal = () => {
  isCheckInModalVisible.value = false;
};

// Handle form submission from the modal
const handleSubmit = (formData: NewRoom) => {
  console.log('Form Submitted:', formData);
  emit('updateRooms', [...props.rooms, formData]); // Update the rooms array with the new room
  closeCheckInModal(); // Close the modal after submission
};

// Method to open the details view for a room
const viewDetailsModal = (room: NewRoom) => {
  selectedRoom.value = room; // Set the selected room for details
};

// Resolve image URL based on filename and external URL
const getImageUrl = (filename: string, imageUrl?: string) => {
  return imageUrl || new URL(`../assets/images/${filename}`, import.meta.url).href;
};

const displaySelectedFloors = computed(() => {
  return Object.keys(selectedFeatures.value).filter(floor => selectedFeatures.value[floor]);
});


// Define selectedFeatures
const selectedFeatures = ref<Record<string, boolean>>({
  '1stfloor': false,
  '2ndfloor': false,
  '3rdfloor': false,
  '4thfloor': false,
});


</script>

<template>
  <div class="grid grid-cols-3 gap-4 pt-4">
    <div
      v-for="(room, index) in props.rooms"
      :key="index"
      class="w-full mx-auto rounded-lg overflow-hidden shadow-lg"
    >
      <div
        :class="{
          'bg-green-600': room.Status === 'Available',  
          'bg-orange-600': room.Status === 'Under Maintenance'
        }"
        class="text-white flex items-center p-3"
      >
        <div>
          <h2 class="text-md font-bold">Room {{ room.roomNumber }}</h2>
        </div>
        <div class="ml-auto">
          <h2 class="text-md font-bold">{{ room.Status }}</h2>
        </div>
      </div>
    
      <div class="flex">
        <div class="w-1/3 bg-slate-200">
          <img
            v-if="room.filename && typeof room.filename === 'string'"
            :src="getImageUrl(room.filename, room.imageUrl)"
            alt="Room Image"
            class="h-40 object-cover"
          />

        </div>
        <div class="w-2/3 p-4">
          <div class="flex justify-between items-start">
            <div>
              <div class="mt-2 text-lg font-semibold">Room Size: {{ room.roomSize }}</div>
              <div class="text-lg font-semibold">Floor: {{ displaySelectedFloors.length > 0 ? displaySelectedFloors.join(', ') : 'Not Selected' }}</div>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-2">
            <button @click="openCheckInModal" class="text-xs bg-green-500 text-white px-4 py-2 rounded shadow">Check In</button>
            <CheckInModal v-if="isCheckInModalVisible" @close="closeCheckInModal" @submit="handleSubmit" />
            <button class="text-xs bg-green-500 text-white px-4 py-2 rounded shadow">Book</button>
            <button @click="viewDetailsModal(room)" class=" text-xs bg-slate-500 text-white px-4 py-2 rounded shadow">View Details</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <DetailsModal v-if="selectedRoom" :room="selectedRoom" @close="selectedRoom = null" />
  </div>
</template>

<style scoped>
.image-preview {
  max-width: 100%;
  max-height: 200px;
}
</style>
