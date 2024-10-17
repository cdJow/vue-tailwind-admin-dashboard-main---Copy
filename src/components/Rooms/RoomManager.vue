<script setup lang="ts">
import { ref } from 'vue';
import AddModal from './AddModal.vue';
import RoomGrid from './RoomGrid.vue';

// Define NewRoom interface
interface NewRoom {
  roomNumber: string;
  roomSize: string;
  Description: string;
  filename: string; // Image filename
  rateI: number;
  rateII: number;
  rateIII: number;
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
  BlanketsQuantity: number;
  PillowsQuantity: number;
  CurtainsQuantity: number;
  TableQuantity: number;
  ChairQuantity: number;
  TVQuantity: number;
  LightbulbQuantity: number;
  ACQuantity: number;
  MirrorQuantity: number;
}

// State variables
const currentDate = ref(new Date());
const showAddModal = ref(false); // Control AddModal visibility
const showDetailsModal = ref(false); // Control Details modal visibility
const selectedRoom = ref<NewRoom | null>(null); // Store the selected room for viewing details

// Initial newRoom data
const newRoom = ref<NewRoom>({
roomNumber: '',
roomSize: '',
Description: '',
filename: '',
rateI: 0,
rateII: 0,
rateIII: 0,
Status: '',
Mattress: '',
Blankets: '',
Pillows: '',
Bed: '',
Curtains: '',
Table: '',
Chair: '',
TV: '',
Lightbulb: '',
AC: '',
Mirror: '',
Others: '',
WifiStatus: '',
BedQuantity: 0,
MattressQuantity: 0,
BlanketsQuantity: 0,
PillowsQuantity: 0,
CurtainsQuantity: 0,
TableQuantity: 0,
ChairQuantity: 0,
TVQuantity: 0,
LightbulbQuantity: 0,
ACQuantity: 0,
MirrorQuantity: 0,
'1stfloor': false,
'2ndfloor': false,
'3rdfloor': false,
'4thfloor': false
});

// Reactive array to hold room data
const rooms = ref<NewRoom[]>([]); 

// Function to add a new room (opens modal)
const addRoom = () => {
  showAddModal.value = true; // Open AddModal
};

const handleRoomBooked = (roomDetails: NewRoom) => {
  rooms.value.push(roomDetails); // Add new room details to the rooms array
  showAddModal.value = false; // Close the modal after booking
};

// Move to the previous day
const previousDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 1);
};

// Move to the next day
const nextDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 1);
};

// Function to view room details
const viewRoomDetails = (room: NewRoom) => {
  selectedRoom.value = room; // Store selected room details
  showDetailsModal.value = true; // Show details modal
};

// Close the details modal
const closeDetailsModal = () => {
  showDetailsModal.value = false; // Close the details modal
  selectedRoom.value = null; // Clear selected room
};
</script>

<template>
  <!-- Add Room Button -->
  <div class="pb-4">
    <button @click="addRoom" class="bg-gradient-to-r from-red to-orange-600 text-white px-4 py-2 rounded">Add Room</button>
  </div>

  <!-- Header with date and navigation buttons -->
  <div class="flex justify-between p-4 bg-black text-white items-center">
    <button @click="previousDay" class="px-4 py-2 bg-gradient-to-r from-red to-orange-600 hover:bg-white hover:text-orange-600 rounded">Previous</button>
    <h1 class="text-lg font-semibold">{{ currentDate.toDateString() }}</h1>
    <button @click="nextDay" class="px-4 py-2 bg-gradient-to-r from-red to-orange-600 hover:bg-white hover:text-orange-600 rounded">Next</button>
  </div>

  <!-- Pass rooms array to RoomGrid -->
  <RoomGrid :rooms="rooms" @viewDetails="viewRoomDetails" />

  <!-- Add Room Modal (AddModal) -->
  <AddModal 
    v-model="showAddModal" 
    :newRoom="newRoom" 
    @roomBooked="handleRoomBooked" 
  />

  <!-- Details Modal for Viewing Room Details -->
  <DetailsModal 
    v-if="showDetailsModal" 
    :room="selectedRoom" 
    @close="closeDetailsModal" 
  />
</template>

<style scoped>
/* Add any custom styles here */
</style>
