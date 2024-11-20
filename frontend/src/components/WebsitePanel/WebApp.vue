<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HotelListing",
  data() {
    return {
      hotels: [
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },
        {
          id: 1,
          name: "Room 101",
          size: "Single Size Bed",
          floor: "1st Floor",
          Status: "Available",
          price0: 200,
          price1: 400,
          price2: 600,
          image: "https://via.placeholder.com/300x200",
       
        },

      
        
        // Add other hotel data if needed
      ],
      isBookingFormOpen: false,
      bookingData: {
        name: "",
        email: "",
        roomType: "",
        floor: "1st Floor",
        selectedPrice: 200,  // Default to price0
      },
    };
  },
  methods: {
    openBookingForm(hotel: any) {
      this.isBookingFormOpen = true;
      this.bookingData.roomType = hotel.name;
      this.bookingData.selectedPrice = hotel.price0; // Set default price when opening the form
    },
    closeBookingForm() {
      this.isBookingFormOpen = false;
    },
    submitBooking() {
      console.log("Booking Data:", this.bookingData);
      // Handle form submission logic (e.g., send data to the server)
      this.closeBookingForm(); // Close the form after submitting
    },
  },
});
</script>


  <style scoped>
  /* Fade Animation */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>

  <template>
    <div class="min-h-screen">
      <!-- Filter Section -->
      <transition name="fade-scale" appear>
        <div class="w-full max-w-3xl mx-auto px-4 py-2">
          <div
            class="bg-white border-[1px] border-slate-200 p-8 rounded-3xl shadow-md flex flex-wrap gap-2 mb-8 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-between"
          >
            <!-- Room Size Dropdown -->
            <div class="w-full sm:w-1/2 md:w-auto">
              <select
                id="roomSize"
                class="w-full px-4 py-2 bg-transparent border border-slate-400 rounded-full shadow outline-none hover:bg-slate-50 focus:ring focus:ring-primary transition-all duration-300"
              >
                <option value="" disabled selected>Room Size</option>
                <option value="">Single Size Bed</option>
                <option value="">Double Size Bed</option>
                <option value="">Queen Size Bed</option>
                <option value="">Family Size Bed</option>
              </select>
            </div>
  
            <!-- Room Rates Dropdown -->
            <div class="w-full sm:w-1/2 md:w-auto">
              <select
                id="roomRates"
                class="w-full px-4 py-2 bg-transparent border border-slate-400 rounded-full shadow outline-none hover:bg-slate-50 focus:ring focus:ring-primary transition-all duration-300"
              >
                <option value="" disabled selected>Room Rates</option>
                <option value="">100</option>
                <option value="">502</option>
                <option value="">800</option>
                <option value="">1000</option>
              </select>
            </div>

              <div class="w-full sm:w-1/2 md:w-auto">
              <select
                id="roomRates"
                class="w-full px-4 py-2 bg-transparent border border-slate-400 rounded-full shadow outline-none hover:bg-slate-50 focus:ring focus:ring-primary transition-all duration-300"
              >
                <option value="" disabled selected>Room status</option>
                <option value="">Available</option>
                <option value="">Occupied</option>
                <option value="">Booked</option>
                <option value="">Under Maintenance</option>
               
              </select>
            </div>
          </div>
        </div>
      </transition>
  
      <!-- Hotel Cards with Animation -->
      <transition name="fade-scale" appear> 
    
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 px-4 bg-white p-5 shadow-md rounded-xl">
          

          <div
            v-for="hotel in hotels"
            :key="hotel.id"
            class="p-2 bg-white rounded-lg shadow-md flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-300"
          >
            <!-- Image Section -->
            <div class="relative sm:w-1/3">
              <img
                class="w-full h-48 sm:h-full rounded-md object-cover bg-slate-200"
                src="https://via.placeholder.com/150"
                alt="Hotel Image"
              />
            </div>
  
            <!-- Info Section -->
            <div class="flex-1 flex flex-col justify-between">
              <!-- Title -->
              <div>
                <h2 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-red bg-clip-text text-transparent">
                  {{ hotel.name }} 
                  <small class="text-xs text-slate-400 whitespace-nowrap">· Room Number</small>
                </h2>
                <p class="text-sm text-gray-500 mt-1">
                  <span class="text-xs ">{{ hotel.size }}</span>   <small class="text-xs text-slate-400 whitespace-nowrap">· Room Size</small>
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  <span class="text-xs ">1st Floor</span>   <small class="text-xs text-slate-400 whitespace-nowrap">· Floor Number</small>
                </p>
                <div>
                  <span class="text-sm text-white bg-gradient-to-r from-green-500 to-green-700 rounded-full px-3 py-1">{{ hotel.Status }}</span>
                </div>
  
                <!-- Features -->
                <div class="flex flex-wrap items-center gap-2 mt-4">
                  <span class="text-xs text-white bg-gradient-to-r from-orange-500 to-red rounded-full px-3 py-1">Wi-Fi</span>
                  <span class="text-xs text-white bg-gradient-to-r from-orange-500 to-red rounded-full px-3 py-1">Airconditioned</span>
                </div>
              </div>
  
              <!-- Pricing Section -->
              <div class="flex flex-wrap gap-4 mt-4">
                <div class="flex flex-col items-start">
                  <span class="text-blue-500 font-bold text-lg">₱{{ hotel.price2 }}</span>
                  <span class="text-xs text-gray-500">24 hours</span>
                </div>
                <div class="flex flex-col items-start">
                  <span class="text-blue-500 font-bold text-lg">₱{{ hotel.price1 }}</span>
                  <span class="text-xs text-gray-500">12 hours</span>
                </div>
                <div class="flex flex-col items-start">
                  <span class="text-green-500 font-bold text-lg">₱{{ hotel.price0 }}</span>
                  <span class="text-xs text-gray-500">6 hours</span>
                </div>
              </div>
            </div>
  
            <!-- Button Section -->
            <div class="sm:w-1/4 flex items-center sm:items-end justify-center sm:justify-end mt-4 sm:mt-0">
              <button
                @click="openBookingForm(hotel)"
                class="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </transition>
  
      <!-- Booking Form (Modal) -->
      <div v-if="isBookingFormOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999">
        <transition name="fade-scale" appear>
          <div class="bg-white rounded-lg shadow-md max-w-[90%] md:w-[30rem] w-full">
            <h2 class="text-lg md:text-xl text-white font-bold mb-4 bg-gradient-to-r from-orange-500 to-red p-6 md:p-9 ">
              Booking Form
            </h2>
            <div class="px-4 md:px-6 lg:px-8 pb-4">
              <form @submit.prevent="submitBooking">
                <div class="mb-4">
                  <label for="name" class="block text-sm md:text-base font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="bookingData.name"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-2 md:py-3 px-3 md:px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-sm md:text-base font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="bookingData.email"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-2 md:py-3 px-3 md:px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="mb-4">
                  <label for="roomType" class="block text-sm md:text-base font-medium text-gray-700">Room Type</label>
                  <input
                    type="text"
                    id="roomType"
                    v-model="bookingData.roomType"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-2 md:py-3 px-3 md:px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    disabled
                  />
                </div>
                <div class="mb-4">
                  <label for="roomFloor" class="block text-sm md:text-base font-medium text-gray-700">Room Floor</label>
                  <input
                    type="text"
                    id="roomFloor"
                    v-model="bookingData.floor"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-2 md:py-3 px-3 md:px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    disabled
                  />
                </div>
                <div class="mb-4">
                  <label for="selectedPrice" class="block text-sm md:text-base font-medium text-gray-700">Select Price</label>
                  <select
                    id="selectedPrice"
                    v-model="bookingData.selectedPrice"
                    class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-2 md:py-3 px-3 md:px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option :value="hotel.price0" v-for="hotel in hotels" :key="hotel.id">
                      ₱{{ hotel.price0 }} - 6 hours
                    </option>
                    <option :value="hotel.price1" v-for="hotel in hotels" :key="hotel.id">
                      ₱{{ hotel.price1 }} - 12 hours
                    </option>
                    <option :value="hotel.price2" v-for="hotel in hotels" :key="hotel.id">
                      ₱{{ hotel.price2 }} - 24 hours
                    </option>
                  </select>
                </div>
                <div class="flex justify-end mt-6 gap-4 ">
                  <button
                    type="button"
                    @click="closeBookingForm"
                    class="bg-red text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2" 
                  >
                    Cancel
                  </button>
                  <button type="submit" 
                  class="bg-green-500 text-white rounded-full text-xs w-full h-10 flex items-center justify-center hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2" 
                  >Book Now</button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
  
      <footer class="bg-slate-400 text-white py-6 mt-4 rounded-xl">
        <div class="container mx-auto text-center">
          <p class="text-sm">
            &copy; 2024 Your Hotel. All rights reserved.
          </p>
          <div class="mt-2">
            <a href="/terms" class="text-gray-400 hover:text-white text-sm mx-2">Terms of Service</a>
            <a href="/privacy" class="text-gray-400 hover:text-white text-sm mx-2">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  </template>
  

  <style scoped>
  /* Animation for fading in and scaling up */
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .fade-scale-enter-from {
    opacity: 0;
    transform: scale(0.9); /* Start smaller */
  }
  
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.9); /* Shrink when leaving */
  }
  /* Additional styling for the footer */
/* Additional styling for the footer */
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer a:hover {
  text-decoration: underline;
}
  </style>
  