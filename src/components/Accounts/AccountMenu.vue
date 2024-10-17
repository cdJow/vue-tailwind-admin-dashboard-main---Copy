<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';




// Define Room interface with additional properties
interface Room {
  Rnumber: string;
  size: string;
  Fnumber: string;
  status: string;
  checkInTime?: string;
  checkOutTime?: string;
  hourRate?: string;
  guest?: string;
  fullName?: string; // Added property
  durationHours?: number; // Added property
  notes?: string; // Added property for notes
  underMaintenance?: boolean; // Added property for maintenance status
  extendedHours?: number; // Added property
  
}

const packages = ref<Room[]>([
  { Rnumber: '01', size: 'Single Size', Fnumber: '2nd Floor', status: 'Available' },
  { Rnumber: '02', size: 'Double Size', Fnumber: '3rd Floor', status: 'Available' },
  // Add more rooms as necessary...
]);

const searchQuery = ref<string>('');
const selectedStatus = ref<string>('Available');
const showModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);
const showCheckInModal = ref<boolean>(false);
const showExtendModal = ref<boolean>(false);
const showCheckoutModal = ref<boolean>(false);
const newRoom = ref<Partial<Room>>({});
const editingRoom = ref<Partial<Room>>({});
const checkInRoom = ref<{
  Rnumber: string;
  size: string;
  Fnumber: string;
  fullName: string;
  hourRate?: string;
  checkInTime?: string;
  durationHours?: number; // Added duration hours
}>({ Rnumber: '', size: '', Fnumber: '', fullName: '' });
const extendRoomData = ref<{ Rnumber: string; additionalHours: number }>({ Rnumber: '', additionalHours: 0 });
const checkoutRoomData = ref<{ Rnumber: string; notes: string; underMaintenance: boolean }>({ Rnumber: '', notes: '', underMaintenance: false });
const activeMenu = ref<number | null>(null);
const editingIndex = ref<number | null>(null);
const checkInIndex = ref<number | null>(null);
const extendIndex = ref<number | null>(null);
const checkoutIndex = ref<number | null>(null);

const filteredPackages = computed(() => packages.value.filter(item => {
  return item.Rnumber.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
         (selectedStatus.value ? item.status === selectedStatus.value : true);
         
}));

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openEditModal = (index: number) => {
  editingRoom.value = { ...packages.value[index] };
  editingIndex.value = index;
  showEditModal.value = true;
  activeMenu.value = null;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const openCheckInModal = (index: number) => {
  checkInRoom.value = { ...packages.value[index], fullName: '', durationHours: 0 };
  checkInIndex.value = index;
  showCheckInModal.value = true;
  activeMenu.value = null;
};

const closeCheckInModal = () => {
  showCheckInModal.value = false;
};

const openExtendModal = (index: number) => {
  extendRoomData.value = { Rnumber: packages.value[index].Rnumber, additionalHours: 0 };
  extendIndex.value = index;
  showExtendModal.value = true;
};

const closeExtendModal = () => {
  showExtendModal.value = false;
};

const openCheckoutModal = (index: number) => {
  checkoutRoomData.value = { ...packages.value[index], notes: '', underMaintenance: false };
  checkoutIndex.value = index;
  showCheckoutModal.value = true;
};

const closeCheckoutModal = () => {
  showCheckoutModal.value = false;
};


const submitRoom = () => {
  if (newRoom.value.Rnumber && newRoom.value.size && newRoom.value.Fnumber && newRoom.value.status) {
    console.log('Adding new room:', newRoom.value); // Log the new room
    packages.value.push({...newRoom.value} as Room);
    newRoom.value = {}; // Reset the form
    closeModal(); // Close the modal
  } else {
    console.error('Failed to add room: Missing information'); // Log if any required fields are missing
  }
};

const submitEditRoom = () => {
  if (editingIndex.value !== null) {
    packages.value[editingIndex.value] = {...editingRoom.value} as Room;
    closeEditModal();
  }
};

const submitCheckIn = () => {
  if (checkInIndex.value !== null && checkInRoom.value.fullName) {
    const checkInTime = dayjs().format('YYYY-MM-DD HH:mm');
    const durationHours = checkInRoom.value.durationHours || 0;
    const checkOutTime = dayjs(checkInTime).add(durationHours, 'hour').format('YYYY-MM-DD HH:mm');
    
    packages.value[checkInIndex.value].status = 'Occupied';
    packages.value[checkInIndex.value].checkInTime = checkInTime;
    packages.value[checkInIndex.value].checkOutTime = checkOutTime;
    packages.value[checkInIndex.value].guest = checkInRoom.value.fullName;
    packages.value[checkInIndex.value].durationHours = durationHours;
    packages.value[checkInIndex.value].extendedHours = undefined;

    closeCheckInModal();

    alert('Check-in successful!');
  }
  
};

const submitExtendRoom = () => {
  if (extendIndex.value !== null && extendRoomData.value.additionalHours > 0) {
    const room = packages.value[extendIndex.value];
    const currentCheckOutTime = dayjs(room.checkOutTime);
    const newCheckOutTime = currentCheckOutTime.add(extendRoomData.value.additionalHours, 'hour').format('YYYY-MM-DD HH:mm');
    
    room.checkOutTime = newCheckOutTime;

    // Update extendedHours
    room.extendedHours = (room.extendedHours || 0) + extendRoomData.value.additionalHours;

    closeExtendModal();
  }
};


const submitCheckoutRoom = () => {
  if (checkoutIndex.value !== null) {
    const room = packages.value[checkoutIndex.value];
    room.status = checkoutRoomData.value.underMaintenance ? 'Under Maintenance' : 'Available';
    room.checkInTime = undefined;
    room.checkOutTime = undefined;
    room.guest = '';
    room.durationHours = undefined; // Clear the extended hours
    room.notes = checkoutRoomData.value.notes;
    room.underMaintenance = checkoutRoomData.value.underMaintenance;

    closeCheckoutModal();
  }
};




const deleteRoom = (index: number) => {
  packages.value.splice(index, 1);
  activeMenu.value = null;
};

const toggleMenu = (index: number) => {
  activeMenu.value = activeMenu.value === index ? null : index;
};

const editRoom = (index: number) => {
  openEditModal(index);
};

const checkoutRoom = (index: number) => {
  openCheckoutModal(index);
};
</script>


<template>
  <!-- Add Room Modal -->
<div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
    <h3 class="text-lg font-medium mb-4">Add New Room</h3>

    <button @click="closeModal" class="absolute top-4 right-4 text-black">✖</button>

    <!-- Add Room Form -->
    <div class="grid grid-cols-1 gap-4 mb-4">
      <input
        type="text"
        v-model="newRoom.Rnumber"
        placeholder="Room Number"
        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        required
      />
     
      <select
      v-model="newRoom.size"
     
       class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    >
    
    <option value="" disabled selected hidden>Select Room Size</option>
      <option value="Available">Single Size</option>
      <option value="Occupied">Double Size</option>
      <option value="Under Maintenance">Queen Size</option>
    </select>

      <select
        v-model="newRoom.Fnumber"
        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      >
      
        <option value="Available">1st Floor</option>
        <option value="Occupied">2nd Floor</option>
        <option value="Under Maintenance">3rd Floor</option>
      </select>

      <select
        v-model="newRoom.status"
        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      >
        <option value="">Select Status</option>
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Under Maintenance">Under Maintenance</option>
      </select>
    </div>

    <div class="flex justify-end space-x-3">
      <button @click="submitRoom" class="bg-primary text-white py-2 px-4 rounded-lg font-medium">
        Add Room
      </button>
      <button @click="closeModal" class="bg-gray-300 text-black py-2 px-4 rounded-lg font-medium">
        Cancel
      </button>
    </div>
  </div>
</div>

  <!-- Check-In Modal -->
  <div v-if="showCheckInModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <h3 class="text-lg font-medium mb-4">Check-In Room {{ checkInRoom.Rnumber }}</h3>

      <button @click="closeCheckInModal" class="absolute top-4 right-4 text-black">✖</button>

      <!-- Check-In Form -->
      <div class="grid grid-cols-1 gap-4 mb-4">
        <p>Room Size: {{ checkInRoom.size }}</p>
        <p>Floor: {{ checkInRoom.Fnumber }}</p>
        
        <input
          type="text"
          v-model="checkInRoom.fullName"
          placeholder="Full Name"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
          required
        />
        
        <input
          type="number"
          v-model.number="checkInRoom.durationHours"
          placeholder="Duration (hours)"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
          min="0"
          required
        />
      </div>

      <div class="flex justify-end space-x-3">
        <button @click="submitCheckIn" class="bg-primary text-white py-2 px-4 rounded-lg font-medium">
          Check-In
        </button>
        <button @click="closeCheckInModal" class="bg-gray-300 text-black py-2 px-4 rounded-lg font-medium">
          Cancel
        </button>
      </div>
    </div>
  </div>

  <!-- Extend Modal -->
  <div v-if="showExtendModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <h3 class="text-lg font-medium mb-4">Extend Room Stay {{ extendRoomData.Rnumber }}</h3>

      <button @click="closeExtendModal" class="absolute top-4 right-4 text-black">✖</button>

      <!-- Extend Form -->
      <div class="grid grid-cols-1 gap-4 mb-4">
        <input
          type="number"
          v-model.number="extendRoomData.additionalHours"
          placeholder="Additional Hours"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
          min="0"
          required
        />
      </div>

      <div class="flex justify-end space-x-3">
        <button @click="submitExtendRoom" class="bg-primary text-white py-2 px-4 rounded-lg font-medium">
          Extend
        </button>
        <button @click="closeExtendModal" class="bg-gray-300 text-black py-2 px-4 rounded-lg font-medium">
          Cancel
        </button>
      </div>
    </div>
  </div>

  <!-- Checkout Modal -->
  <div v-if="showCheckoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <h3 class="text-lg font-medium mb-4">Checkout Room {{ checkoutRoomData.Rnumber }}</h3>

      <button @click="closeCheckoutModal" class="absolute top-4 right-4 text-black">✖</button>

      <!-- Checkout Form -->
      <div class="grid grid-cols-1 gap-4 mb-4">
        <textarea
          v-model="checkoutRoomData.notes"
          placeholder="Notes (optional)"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
        ></textarea>

        <label class="inline-flex items-center">
          <input
            type="checkbox"
            v-model="checkoutRoomData.underMaintenance"
            class="form-checkbox text-primary"
          />
          <span class="ml-2">Mark as Under Maintenance</span>
        </label>
      </div>

      <div class="flex justify-end space-x-3">
        <button @click="submitCheckoutRoom" class="bg-primary text-white py-2 px-4 rounded-lg font-medium">
          Checkout
        </button>
        <button @click="closeCheckoutModal" class="bg-gray-300 text-black py-2 px-4 rounded-lg font-medium">
          Cancel
        </button>
      </div>
    </div>
  </div>

  <!-- Search and Filter Section -->
  <div class="mb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <button
      @click="openModal"
      class="w-full sm:w-auto rounded-lg border-[1.5px] text-white border-stroke bg-blue-400 py-3 px-5 font-normal outline-none"
    >
      Add New Room
    </button>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="w-full sm:w-auto rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
    />

    <select
      v-model="selectedStatus"
      class="w-full sm:w-auto rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
    >
      <option value="">All</option>
      <option value="Available">Available</option>
      <option value="Occupied">Occupied</option>
      <option value="Under Maintenance">Under Maintenance</option>
    </select>
  </div>

  <!-- Room Table -->
<!-- Room Table -->
<div class="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default">
  <div class="max-w-full overflow-x-auto">
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-2 text-left">
          <th class="py-4 px-4 font-medium text-xs">Room Number</th>
          <th class="py-4 px-4 font-medium text-xs">Room Size</th>
          <th class="py-4 px-4 font-medium text-xs">Floor Number</th>
          <th class="py-4 px-4 font-medium text-xs">Status</th>
          <th class="py-4 px-4 font-medium text-xs">Check-In Time</th>
          <th class="py-4 px-4 font-medium text-xs">Check-Out Time</th>
          <th class="py-4 px-4 font-medium text-xs">Extended Hours</th> <!-- New Column -->
          <th class="py-4 px-4 font-medium text-xs">Full Name</th>
          <th class="py-4 px-20 font-medium text-xs">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredPackages" :key="index">
          <td class="py-5 px-4">{{ item.Rnumber }}</td>
          <td class="py-5 px-4">{{ item.size }}</td>
          <td class="py-5 px-4">{{ item.Fnumber }}</td>
          <td class="py-5 px-4">
            <p
              class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
              :class="{
                'bg-warning text-warning': item.status === 'Under Maintenance',
                'bg-danger text-danger': item.status === 'Occupied',
                'bg-success text-success': item.status === 'Available'
              }"
            >
              {{ item.status }}
            </p>
          </td>
          <td class="py-5 px-4 text-xs">
            <span class=" text-green-500 px-2 py-1 rounded-md">
              {{ item.checkInTime || 'N/A' }}
            </span>
          </td>
          
          <td class="py-5 px-4 text-xs">
            <span class=" text-red px-2 py-1 rounded-md">
              {{ item.checkOutTime || 'N/A' }}
            </span>
          </td>
          <td class="py-5 px-4 text-xs">
            <span
              :class="{
                'bg-orange-400 text-white': item.extendedHours !== undefined && item.extendedHours > 0,
                'bg-gray-200 text-gray-500': item.extendedHours === undefined || item.extendedHours <= 0
              }"
              class="inline-block px-2 py-1 rounded"
            >
              {{ item.extendedHours !== undefined ? item.extendedHours : 'N/A' }}
            </span>
          </td>
          
          
          <td class="py-5 px-4 text-xs">{{ item.guest || 'N/A' }}</td>
          <td class="py-5 px-4">
            <div class="flex items-center space-x-3.5">
              <button
                v-if="item.status === 'Available'"
                @click="openCheckInModal(index)"
                class="bg-green-500 inline-flex items-center justify-center rounded-full py-2 px-4 text-xs font-medium text-white"
              >
                Check-In
              </button>

              <button
                v-if="item.status === 'Occupied'"
                @click="openExtendModal(index)"
                class="bg-yellow-500 inline-flex items-center justify-center rounded-full py-2 px-4 text-xs font-medium text-white"
              >
                Extend
              </button>

              <button
                v-if="item.status === 'Occupied'"
                @click="checkoutRoom(index)"
                class="bg-red inline-flex items-center justify-center rounded-full py-2 px-4 text-xs font-medium text-white"
              >
                Checkout
              </button>

              <div v-if="item.status !== 'Occupied'" class="menu-container relative">
                <button @click="toggleMenu(index)" class="text-gray-600 hover:bg-blue-200 p-2 rounded">⋮</button>
                <div v-if="activeMenu === index" class="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-blue-200 z-50">
                  <button @click="editRoom(index)" class="block px-4 py-2 text-black hover:bg-gray-100">Edit</button>
                  <button @click="deleteRoom(index)" class="block px-4 py-2 text-red-600 hover:bg-gray-100">Delete</button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


  <!-- Edit Room Modal -->
  <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
      <h3 class="text-lg font-medium mb-4">Edit Room</h3>
      <button @click="closeEditModal" class="absolute top-4 right-4 text-black">✖</button>
      <div class="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          v-model="editingRoom.Rnumber"
          placeholder="Room Number"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none"
        />

        
        <select
          v-model="editingRoom.size"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
          required
        >
        <option disabled value="">Select Floor Num</option>
          <option value="">Select Size</option>
          <option value="Single Size">Single Size</option>
          <option value="Double Size">Double Size</option>
          <option value="Queen Size">Queen Size</option>
        </select>


        <select
  v-model="editingRoom.Fnumber"
  class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
  required
>
<option disabled value="">Select your subject</option>
  <option value="1st Floor">1st Floor</option>
  <option value="2nd Floor">2nd Floor</option>
  <option value="3rd Floor">3rd Floor</option>
</select>


        <select
          v-model="editingRoom.status"
          class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
          required
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>
      <div class="flex justify-end space-x-3">
        <button @click="submitEditRoom" class="bg-green-600 inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-medium text-white w-25 h-8">
          Update
        </button>
      </div>
    </div>
  </div>
</template>
