<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted,  ref, type PropType } from 'vue';

import AddRoom from './AddRoom.vue';
import CheckInModal from './CheckInModal.vue';
import BookingForm from './BookingForm.vue';
import AddSuccessMessage from './AddSuccessMessage.vue';
import ConfirmationModal from './ConfirmationModal.vue';


interface Room {
  rate: any;
  id: number;
  number: string;
  size: string;
  status: 'available' | 'occupied' | 'booked' | 'unavailable' | 'cleaning';
  imageUrl?: string;
  amenities: Record<string, number>;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  checkInTime?: string;
  checkOutTime?: string; // Added checkOutTime to the Room interface
  bookingDetails: any;
  bookingTime: string;

  priceRanges?: {
    hours6: number;
    hours12: number;
    hours24: number;
  }; // Add priceRanges here
  
}






export default defineComponent({
  components: {
    AddRoom,
    CheckInModal,
    BookingForm,
    AddSuccessMessage,
    ConfirmationModal,
   
  },

  props: {
  room: {
    type: Object as PropType<Room>,
  },
},
  




  


  setup() {

      try {
        // code in setup function
      } catch (error) {
        console.error('Error in setup function:', error);
      }

      const bookingEndTime = ref<number>(Date.now() + 10 * 1000);  // 10 seconds from now
const currentTime = ref<number>(Date.now());  // Current time, updated every second

// Computed property to calculate and format remaining time
const formattedTime = computed(() => {
  const remainingTime = bookingEndTime.value - currentTime.value;
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Setup interval to update current time every second
onMounted(() => {
  const interval = setInterval(() => {
    currentTime.value = Date.now();  // Update current time every second
  }, 1000);

  // Cleanup interval when the component is unmounted
  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});

    
      const isModalVisible = ref(false);

    const showAddRoom = ref(false);
    const showBookingForm = ref(false);
    const showCheckInModal = ref(false);
    const items = ref<Room[]>([]);
    const selectedRoom = ref<Room | null>(null);

    const availableAmenities = ref([
      { name: 'Mattress', maxQuantity: 10 },
      { name: 'Blankets', maxQuantity: 15 },
      { name: 'Pillows', maxQuantity: 20 },
      { name: 'Bed', maxQuantity: 5 },
      { name: 'Curtains', maxQuantity: 10 },
      { name: 'Chair', maxQuantity: 8 },
      { name: 'Table', maxQuantity: 12 },
      { name: 'TV', maxQuantity: 5 },
      { name: 'AC', maxQuantity: 3 },
      { name: 'Mirror', maxQuantity: 10 },
      { name: 'Light Bulb', maxQuantity: 30 },
    ]);


    

    const showCheckOutModal = ref(false);
    const showAmenitiesModal = ref(false);
    const selectedAmenities = ref<Record<string, number>>({});
    const remainingTime = ref<string>(''); // To display remaining time as a string
    const invoiceVisible = ref(false);

    const openAmenitiesModal = (room: Room) => {
      selectedRoom.value = room;
      selectedAmenities.value = { ...room.amenities };
      showAmenitiesModal.value = true;
    };
    

    
    const addRoom = () => {
      showAddRoom.value = true;
    };

    const handleAddRoom = (newRoom: Room) => {
      items.value.push(newRoom);
      showAddRoom.value = false;
      showSuccessMessage.value = true;
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000); 
    };
    



    const showSuccessMessage = ref(false);

    const selectRoom = (room: Room) => {
      selectedRoom.value = room;
  // Check if the room is booked, start the timer if it has check-out time
  

  // Open the check-in modal only if the room is booked and not yet occupied
  if (room.status === 'booked') {
    showCheckInModal.value = true;
  } else {
    showCheckInModal.value = false;
  }
};




    const closeSelectedRoomModal = () => {
      selectedRoom.value = null;
    
    };

    const closeBookingForm = () => {
      showBookingForm.value = false;
    };

    const closeCheckInModal = () => {
      showCheckInModal.value = false;
    };
  const handleBookingCheckIn = (data: { fullName: string; phoneNumber: string; email: string; checkOutTime: string }) => {
  console.log('Handling booking check-in:', data);

  if (selectedRoom.value) {
    selectedRoom.value = {
      ...selectedRoom.value,
      ...data,
      status: 'occupied',
      checkInTime: new Date().toISOString(),
    };

    // Log the updated room details for debugging
    console.log('Updated room after check-in:', selectedRoom.value);

    // Update the room in the list to reflect changes in the UI
    updateRoomList(selectedRoom.value);
    
    closeCheckInModal();
    closeSelectedRoomModal();
  } else {
    console.error('No room selected for check-in.');
  }
};



const formatDate = (isoString: string) => {
  if (!isoString) return ''; // Handle undefined or empty string
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

    const updateShowCheckInModal = () => {
      showCheckInModal.value = !showCheckInModal.value; // Toggle visibility
    };

    const deleteRoom = (room: Room) => {
  const index = items.value.findIndex(r => r.id === room.id);
  if (index !== -1) {
    items.value.splice(index, 1); // Remove the room from the items list
    closeSelectedRoomModal(); // Close the room modal
    closeDeleteModal(); // Close the confirmation modal
  }
};
const markRoomAsUnavailable = (room: Room) => {
  if (room.status === 'available') {
    room.status = 'unavailable'; // Mark the room as unavailable
    updateRoomList(room); // Update the room list with the new status
    closeSelectedRoomModal(); // Close the room modal
  }
};


const markRoomAsCleaning = (room: Room) => {
  if (room.status === 'cleaning') {
    room.status = 'cleaning'; // Mark the room as cleanings
    updateRoomList(room); // Update the room list with the new status
    closeSelectedRoomModal(); // Close the room modal
  }
};


// Define the booking function with auto-cancel logic
const bookRoom = (data: { fullName: string; phoneNumber: string; email: string; checkOutTime: string }) => {
  if (selectedRoom.value) {
    selectedRoom.value = { 
      ...selectedRoom.value, 
      ...data, 
      status: 'booked', 
    };

   
    // Store the cancel timer ID in the room data to use it later if needed
  

    // Update the room list with the new booking data
    const roomIndex = items.value.findIndex(room => room.id === selectedRoom.value!.id);
    if (roomIndex !== -1) {
      items.value[roomIndex] = { ...selectedRoom.value };
    }

    // Show the countdown timer
    closeBookingForm();
  }
};


    const amenities = ref([
      { name: "WiFi", quantity: 2 },
      { name: "Towels", quantity: 5 },
      { name: "Bottled Water", quantity: 3 },
    ]); // Replace with data fetched from an API

    // Close the modal
    const closeModal = () => {
      showAmenitiesModal.value = false;
    };

   


    // Computed property to transform the amenities object into an editable format
    const amenitiesToEdit = computed(() => {
      if (selectedRoom.value?.amenities) {
        return Object.entries(selectedRoom.value.amenities).map(([name, quantity]) => ({
          name,
          quantity,
        }));
      }
      return []; // return an empty array if amenities are not available
    });

    // Open the modal
    const openModal = () => {
      showAmenitiesModal.value = true;
    };

    
    // Save changes to the amenities
    const saveAmenities = () => {
      if (selectedRoom.value) {
        // Update the selectedRoom amenities with the edited values
        selectedRoom.value.amenities = amenitiesToEdit.value.reduce(
          (acc, { name, quantity }) => {
            acc[name] = quantity;
            return acc;
          },
          {}
        );
      }
      closeModal(); // Close the modal after saving
    };


    

// Countdown timer logic

// Cancel the booking logic
const cancelBooking = () => {
  if (selectedRoom.value) {
    // Update the room status to 'available' and reset booking details
    selectedRoom.value.status = 'available';
    selectedRoom.value.bookingTime = ''; // Clear the booking time
    selectedRoom.value.fullName = '';
    selectedRoom.value.phoneNumber = '';
    selectedRoom.value.email = '';
    selectedRoom.value.checkOutTime = '';

    // Update the room list after cancellation
    const roomIndex = items.value.findIndex(room => room.id === selectedRoom.value!.id);
    if (roomIndex !== -1) {
      items.value[roomIndex] = { ...selectedRoom.value };
    }

    console.log('Booking has been canceled');
  }
  isModalVisible.value = false;
  
};

// Handle booking process
const handleBooking = (data: { fullName: string; phoneNumber: string; email: string; checkOutTime: string }) => {
  console.log('handleBooking called with data:', data);
  if (selectedRoom.value) {
   
    selectedRoom.value = { 
      ...selectedRoom.value, 
      ...data, 
      status: 'booked', 
     
    };

    updateRoomList(selectedRoom.value);
  } else {
    console.error('No room selected');
  }

  closeBookingForm(); // Close the booking form modal
  closeCheckInModal(); // Close the check-in modal
  closeSelectedRoomModal(); // Close the room details modal
 
};




function updateAmenity(amenityName: string, newQuantity: number) {
  // Your update logic
  console.log(`Updating ${amenityName} to ${newQuantity}`);
}


const showOptions = ref(false); // Controls the visibility of the options menu
const showDeleteModal = ref(false); // Controls the visibility of the delete confirmation modal

 // This ref controls the visibility of the options menu

// Toggle visibility of the options menu
const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

// Function to open the delete confirmation modal
const openDeleteModal = (room: Room) => {
  selectedRoom.value = room;
  showDeleteModal.value = true; // Show the confirmation modal
};
const closeDeleteModal = () => {
  showDeleteModal.value = false; // Close confirmation modal
};
    // Invoice Calculation Logic
    function calculateInvoice(room: Room) {
   const baseRoomRate = room.rate;
   const amenities = room.amenities || {};
   const amenitiesTotal = Object.values(amenities).reduce((total, qty) => total + qty * 10, 0);

   return {
      breakdown: {
         baseRoomRate,
         amenities,
      },
      total: baseRoomRate + amenitiesTotal,
   };
}



    const markRoomAsAvailable = (room: Room) => {
  room.status = 'available'; // Mark the room as available
  updateRoomList(room); // Update the room list to reflect the change
  closeSelectedRoomModal(); // Close the modal
};

const invoiceData = ref<{
  breakdown: {
    baseRoomRate: number;
    amenities: Record<string, number>;
  };
  total: number;
} | null>(null);

/**
 * Handles the check-out process for a room.
 * Generates an invoice based on the room rate and amenities used.
 * Clears the room details and stops any active timer.
 * Opens the invoice modal.
 */
 const checkOutRoom = async () => {
  if (selectedRoom.value) {
    // Generate invoice details
    const invoiceDetails = calculateInvoice(selectedRoom.value);
    invoiceData.value = invoiceDetails;
    invoiceVisible.value = true; // Show the invoice modal

    // Clear room details for check-out
    selectedRoom.value.status = 'cleaning';

    selectedRoom.value.fullName = '';
    selectedRoom.value.phoneNumber = '';
    selectedRoom.value.email = '';
    selectedRoom.value.checkInTime = '';
    selectedRoom.value.checkOutTime = '';
    selectedRoom.value.amenities = {};
    console.log('Selected room status:', selectedRoom.value.status);
    showCheckOutModal.value = false;

 
    // Emit event to the parent component
  }
};




const updateRoomList = (updatedRoom: Room) => {
  const roomIndex = items.value.findIndex(room => room.id === updatedRoom.id);
  if (roomIndex !== -1) {
    items.value[roomIndex] = { ...updatedRoom };
  }
};



const promptCancelBooking = () => {
      isModalVisible.value = true;
    };


    return {
      items,
      selectedRoom,
      showAddRoom,
      showBookingForm,
      showCheckInModal,
      showAmenitiesModal,
      availableAmenities,
      selectedAmenities,
      remainingTime, // Add remainingTime to return
      addRoom,
      handleAddRoom,
      saveAmenities,
      selectRoom,
      closeSelectedRoomModal,
      closeBookingForm,
      closeCheckInModal,
      handleBookingCheckIn,
      formatDate,
      updateShowCheckInModal,
      handleBooking,
      bookRoom,
      checkOutRoom,
      showSuccessMessage,
      markRoomAsUnavailable,
      markRoomAsCleaning,
      deleteRoom,
      toggleOptions,
      showOptions,
      openDeleteModal,
      closeDeleteModal,
      showDeleteModal,
      markRoomAsAvailable,
      cancelBooking,
      promptCancelBooking,
      isModalVisible,
      formattedTime,
      showCheckOutModal,
      currentTime,
      priceRanges: {},
      openAmenitiesModal,
      showopenAmenitiesModal: false,
      updateAmenity,
      amenities,
      closeModal,
 
      amenitiesToEdit,
      openModal,

     
      
  
  
    

      

      
    };
    
  },

  
});
</script>
<template>

<div class="grid gird-cols-1 md:grid-cols-10 gap-2">
  
<!--side Cards-->
  <div class=" col-span-4 ">
    <div class="grid grid-cols-1 gap-2">

      <!--Booking List-->
      <div class="col-span-4">
        <div class="grid grid-cols-1 gap-2">
          <!-- Booking List -->
          <div class="bg-white shadow-md rounded-lg h-[265px] overflow-auto w-full">
            <!-- Header -->
            <div class="bg-blue-500 p-2 sticky top-0  flex items-center justify-between">
              <div class="flex items-center">
                <label class="text-white font-semibold">Booking List </label>
                <label class="text-white text-xs pl-2">| Nov - 16 - 2024</label>
              </div>
              <!-- Search Input -->
             
                <div class="flex items-center w-full sm:w-auto">
                  <!-- Search Input -->
                  <input
                    type="text"
                    placeholder="Search..."
                    class="w-1/2 sm:flex-1 mr-2 rounded-lg text-black bg-slate-100 py-1 px-4 border border-transparent outline-none transition focus:border-blue-500 active:border-blue-500"
                  />
                
                  <!-- Search Button -->
                  <button
                    type="submit"
                    class="p-2 text-white bg-blue-500 rounded-lg border border-white hover:border-2 hover:border-white hover:bg-white hover:text-blue-500 "
                    >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </div>
              
              
            </div>
      
            <!-- Table Section -->
            <div class="overflow-auto h-[240px]">
              <table class="text-left w-full">
                <thead>
                  <tr class="bg-slate-200 text-gray-700 dark:bg-meta-4">
                    <th class="w-[90px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Room Num</th>
                    <th class="w-[120px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Guest Name</th>
                    <th class="w-[120px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Phone Num</th>
                    <th class="w-[150px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Email</th>
                    <th class="w-[200px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Booked Time</th>
                    <th class="w-[200px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Remaining Time</th>

                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b-2 border-b-slate-300">
                    <td class="py-2 px-2 text-xs whitespace-nowrap">1</td>
                    <td class="py-2 px-2 text-xs whitespace-nowrap">John Doe</td>
                    <td class="py-2 px-2 text-xs whitespace-nowrap">1234567890</td>
                    <td class="py-2 px-2 text-xs whitespace-nowrap truncate">L0DasC@example.com</td>
                    <td class="py-2 px-2 text-xs whitespace-nowrap">Nov 16, 2024 12:00 PM</td>
                    <td class="py-2 px-2 text-xs whitespace-nowrap truncate bg-blue-500 text-white">9:00 min</td>
                    
                   
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
   
    
          <!--to check out List-->
          <div class="col-span-4">
            <div class="grid grid-cols-1 gap-2">
              <!-- Booking List -->
              <div class=" bg-white shadow-md rounded-lg h-[265px] overflow-auto w-full">
                <!-- Header -->
                <div class="bg-red p-2 flex items-center sticky top-0 z-100 justify-between">
                  <label class="text-white font-semibold">To Check Out</label>
                  <label class="text-white text-xs">| Nov - 16 - 2024</label>
                  <div class="flex items-center w-full sm:w-auto">
                    <!-- Search Input -->
                    <input
                      type="text"
                      placeholder="Search..."
                      class="w-1/2 sm:flex-1 mr-2 rounded-lg text-black bg-slate-100 py-1 px-4 border border-transparent outline-none transition focus:border-blue-500 active:border-blue-500"
                    />
                  
                    <!-- Search Button -->
                    <button
                      type="submit"
                      class="p-2 text-white bg-red rounded-lg border border-white hover:border-2 hover:border-white hover:bg-white hover:text-red transition duration-300 ease-in-out"
                    >
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span class="sr-only">Search</span>
                    </button>
                  </div>
                </div>

                
          
                <!-- Table Section -->
                <div class="overflow-auto h-[240px]">
                  <table class="text-left w-full">
                    <thead>
                      <tr class="bg-slate-200 text-gray-700 dark:bg-meta-4">
                        <th class="w-[90px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Room Num</th>
                        <th class="w-[120px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Guest Name</th>
                        <th class="w-[120px] py-2 px-2 font-medium text-xs whitespace-nowrap border-2 border-white">Check Out Time</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b-2 border-b-slate-300 pb-2">
                        <td class="py-2 px-2 text-xs whitespace-nowrap">1</td>
                        <td class="py-2 px-2 text-xs whitespace-nowrap">John Doe</td>
                        <td class="py-2 px-2 text-xs whitespace-nowrap bg-red text-white"> 12:00 PM</td>
                      
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

     


      
            </div>

            </div>

  
          <div class="bg-white shadow-sm px-2 rounded-lg col-span-6 overflow-auto h-[540px]">
            <div class="bg-white shadow-md p-2 sticky top-0 z-100 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <!-- Add Room Button -->
                    <button 
                @click="addRoom" 
                type="button" 
                class="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border text-white bg-blue-500 py-2 px-4 font-normal outline-none hover:bg-blue-500 transition"
              >
                <svg 
                  class="w-4 h-4" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  stroke-width="2"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M12 4v16m8-8H4" 
                  />
                </svg>
                Add Room
              </button>

                  
      <!-- Search Input -->
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Search Input -->
        <input
          type="text"
          placeholder="Search..."
          class="w-full sm:w-auto flex-1 rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      
        <!-- Filter Dropdown -->
        <select
          class="w-full sm:w-auto rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
          <option :disabled="true" value="">Filters</option>
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Booked">Booked</option>
          <option value="Unavailable">Unavailable</option>
          <option value="Cleaning">Cleaning</option>
        </select>
      </div>

    </div>      



    
    
    
  <!-- Card -->
    <div class="container mx-auto grid px-1 pt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white border border-slate-200 rounded-lg shadow-md p-4 flex flex-col cursor-pointer"
        @click="selectRoom(item)"
      >
        <div :class="{'bg-red': item.status === 'occupied', 'bg-green-500': item.status === 'available', 'bg-blue-500': item.status === 'booked','bg-yellow-500': item.status === 'unavailable','bg-orange-500': item.status === 'cleaning'}" 
             class="h-9">
             <p class="text-white font-bold text-lg p-2" style="text-transform: uppercase;"> {{ item.status }}</p>
        </div>
        
        <div v-if="item.imageUrl" class="mb-2">
          <img :src="item.imageUrl" alt="Room Image" class="w-full h-20 object-cover " />
        </div>
        <h3 class="text-xl font-semibold">Room Number: {{ item.number }}</h3>
        <p class="text-gray-600">Room Size: {{ item.size }}</p>
        <p v-if="item.status === 'occupied' && item.checkOutTime" class="text-gray-600 bg-red text-white p-2 font-bold  rounded-lg">
          Check-Out Time: {{ formatDate(item.checkOutTime) }}
        </p>
        
        
      </div>
    </div>
  

   
    
  
    <AddRoom v-model="showAddRoom" @add-room="handleAddRoom" />
    <AddSuccessMessage v-if="showSuccessMessage" />

    
    <!--Edit Aminites-->
    <div v-if="showAmenitiesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/3 max-h-[600px] overflow-auto">
        <h2 class="text-xl font-bold bg-orange-500 text-white p-9 mb-4">Edit Amenities</h2>
        <div class="pr-4 pl-4 pb-4">
          <!-- Table for displaying amenities -->
          <table class="w-full">
            <thead>
              <tr class="bg-gray-200">
                <th class="px-4 py-2 text-left font-semibold">Amenity</th>
                <th class="px-4 py-2 text-left font-semibold">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(amenity, index) in amenitiesToEdit" :key="index" >
                <td class="px-4 py-2">{{ amenity.name }}</td>
                <td class="px-4 py-2">
                  <input
                    type="number"
                    v-model.number="amenity.quantity"
                    class="w-full sm:w-auto flex-1 rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Save and Cancel Buttons -->
          <div class="mt-4 flex justify-end gap-2">
            <button @click="saveAmenities" 
            class="bg-green-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2" 
          
            >Save</button>
            <button @click="closeModal" 
            class="bg-red text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2" 
          
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>

  
  
    <!-- Room Details Modal -->
    <div v-if="selectedRoom" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative bg-white rounded-lg p-2 w-full max-w-lg max-h-[600px] overflow-auto ">
        <!-- Close Icon at Top Right -->
        <button @click="closeSelectedRoomModal" class="absolute top-4 right-4 text-gray-500 hover:text-red">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <h1 class="text-xl pl-4 font-semibold mb-4 mt-4">Room Details</h1>
        <div class="p-4">
          <p class="text-xl">Room Number: {{ selectedRoom?.number }}</p>
          <p class="text-xl">Room Size: {{ selectedRoom?.size }}</p>
          <p class="text-gray-600">Room Rates:</p>
          <ul>
            <li v-for="(rate, duration) in selectedRoom.priceRanges" :key="duration">
              {{ duration }}: {{ rate }}
            </li>
          </ul>
          <p class=" text-white w-full  p-2 text-xl font-bold rounded-lg"
      :class="{'bg-red': selectedRoom?.status === 'occupied', 'bg-green-500': selectedRoom?.status === 'available', 'bg-blue-500': selectedRoom?.status === 'booked','bg-yellow-500': selectedRoom?.status === 'unavailable','bg-orange-500': selectedRoom?.status === 'cleaning'}" 
      >Room Status: {{ selectedRoom?.status }}</p>
      
      
      
          <!-- Guest Information - Only shows if status is 'booked' -->
          <div v-if="selectedRoom?.status === 'booked'">
            <h4 class="mt-4 font-semibold">Booking Details</h4>
            <p>Full Name: {{ selectedRoom?.fullName }}</p>
            <p>Phone Number: {{ selectedRoom?.phoneNumber }}</p>
            <p>Email: {{ selectedRoom?.email }}</p>
            <p>Booked Time: {{ formatDate(selectedRoom?.bookingTime || '') }}</p>
           
          </div>
  

          <div v-if="showCheckOutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg p-4 jus">
              <div class="flex justify-center">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> 
              </div>
              <h2 class="text-lg mb-2 mt-3 flex justify-center">Confirm Check Out</h2>
              <p class="mb-4">Are you sure you want to check out this room?</p>
              <div class="flex justify-center">
                <button @click="checkOutRoom()" class="bg-red mr-2 text-white rounded-full text-xs w-1/4 h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2">
                  Confirm
                </button>
                <button @click="showCheckOutModal = false" class="bg-white text-gray-700 rounded-full text-xs w-1/4 h-10 flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 hover:border-gray-300 hover:border-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
  
         
          
          <!-- Check-in Information - Only shows if status is 'occupied' -->
          <div v-if="selectedRoom?.status === 'occupied'">
            <h4 class="mt-4 font-semibold">Check-In Details</h4>
            <p>Full Name: {{ selectedRoom?.fullName }}</p>
            <p>Phone Number: {{ selectedRoom?.phoneNumber }}</p>
            <p>Email: {{ selectedRoom?.email }}</p>
            <p>Check-In Time: {{ formatDate(selectedRoom?.checkInTime || '') }}</p>
            <p>Check-Out Time: {{ formatDate(selectedRoom?.checkOutTime || '') }}</p>
          </div>
  
          <div v-if="selectedRoom.amenities">
            <h4 class=" mb-5 mt-4 font-semibold text-slate-700">Amenities</h4>
            <table class="mt-2 w-full border rounded-lg border-slate-300 text-left">
              <thead>
                <tr class="bg-green-500">
                  <th class="px-4 py-2 font-semibold text-white border-b">Amenity</th>
                  <th class="px-4 py-2 font-semibold text-white border-b">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(quantity, amenity) in selectedRoom.amenities" :key="amenity" class="border-b">
                  <td class="px-4 py-2 text-slate-800">{{ amenity }}</td>
                  <td class="px-4 py-2 text-slate-600">{{ quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div v-if="selectedRoom?.status === 'unavailable'">
            <div v-if="showOptions" class="absolute bg-white shadow-md rounded-md mt-2 w-full">
              <button 
                @click="markRoomAsAvailable(selectedRoom)"
                class="w-full text-left py-2 px-4 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Mark as Available
              </button>
              <button 
                @click="openDeleteModal(selectedRoom)"
                class="w-full text-left py-2 px-4 text-red hover:bg-red hover:text-white"
              >
                Delete Room
              </button>
            </div>
          </div>
  
          <!-- Cleaning Options - Only shows if status is 'cleaning' -->
          <div v-if="selectedRoom?.status === 'cleaning'">
            <div v-if="showOptions" class="absolute bg-white shadow-md rounded-md mt-2 w-full">
              <button 
                @click="markRoomAsAvailable(selectedRoom)"
                class="w-full text-left py-2 px-4 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Mark as Available
              </button>
              <button 
                @click="openDeleteModal(selectedRoom)"
                class="w-full text-left py-2 px-4 text-red hover:bg-red hover:text-white"
              >
                Delete Room
              </button>
            </div>
          </div>
  
          <!-- Buttons Grid -->
          <div class=" mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div v-if="selectedRoom?.status === 'available'">
              <button
                @click="toggleOptions"
                class="bg-orange-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-orange-500 hover:border-orange-500 hover:border-2"
              >
                Options
              </button>
  
            
              <div v-if="showOptions" class="absolute bg-white shadow-md rounded-md mt-2 w-full p4">
                <button 
                  @click="openDeleteModal(selectedRoom)" 
                  class="w-full text-left py-2 px-4 text-red hover:bg-red hover:text-white">
                  Delete Room
                </button>
              
                <button 
                  @click="markRoomAsUnavailable(selectedRoom)"
                  class="w-full text-left py-2 px-4 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                  Mark as Unavailable
                </button>
              </div>

            </div>
            <button
            v-if="selectedRoom?.status === 'cleaning'" 
              @click="toggleOptions"
              class="bg-orange-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-orange-500 hover:border-orange-500 hover:border-2"
            >
              Options
            </button>
          
            
            <button @click="openModal" 
            class="bg-blue-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-yellow-500 hover:border-yellow-500 hover:border-2" 
            >
              Edit Amenities
            </button>
            <button 
              v-if="selectedRoom?.status === 'available'" 
              @click="showBookingForm = true" 
              class="bg-blue-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-yellow-500 hover:border-yellow-500 hover:border-2" 
            >
              Book Room
            </button>
          
            <button 
            v-if="selectedRoom?.status === 'booked'" 
            @click="showCheckInModal = true" 
            class="bg-green-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2" 
          >
            Check In
          </button>
            <button 
              v-if="selectedRoom?.status === 'occupied'" 
              @click="showCheckOutModal = true" 
              class="bg-red text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2" 
            >
              Check Out
            </button>
            <button 
              v-if="selectedRoom?.status === 'booked'" 
               @click="promptCancelBooking"
              class="bg-red p-1 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2" 
            >
              Cancel Booking
            </button>
          </div>
        </div>
  
        
  
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="relative bg-white rounded-lg p-6 w-full max-w-sm">
            <button @click="closeDeleteModal" class="absolute top-4 right-4 text-gray-500 hover:text-red">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

              <div class="flex justify-center pb-4" >
                <svg class="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636" stroke="red" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>
            
          
              <p class="text-lg font-semibold mb-6 text-center">
                Are you sure you want to delete this room?
              </p>
            <div class="mt-4 flex justify-between">
              <button @click="deleteRoom(selectedRoom)" 
              class="bg-red p-1 text-white rounded-full text-xs px-7 py-2 h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2" 
            >
                Yes, Delete
              </button>
              <button @click="closeDeleteModal" class="bg-slate-500 p-1 text-white rounded-full text-xs px-7 py-2 h-10 flex items-center justify-center hover:bg-white hover:text-slate-500 hover:border-slate-500 hover:border-2" 
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

</div>

 

  <ConfirmationModal
      :isVisible="isModalVisible"
      message="Are you sure you want to cancel this booking?"
      confirmText="Confirm"
      cancelText="Back"
      @confirm="cancelBooking"
      @cancel="isModalVisible = false"
    />

  

  <BookingForm 
    v-if="showBookingForm" 
    :show="showBookingForm" 
    @confirm-booking="handleBooking" 
    @close="closeBookingForm" 
  />

  <CheckInModal
    v-if="showCheckInModal && selectedRoom"
    :show="showCheckInModal"
    :room="selectedRoom"
    :bookingDetails="selectedRoom.bookingDetails"
    :onBooking="handleBooking"
    :onBookingCheckIn="handleBookingCheckIn"
    :updateShow="updateShowCheckInModal"
    @confirm-check-in="handleBookingCheckIn" 
    @close="closeCheckInModal"
  />
</template>
