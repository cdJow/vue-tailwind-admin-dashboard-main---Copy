<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const days = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur']

const currentDate = ref(new Date())
const hoveredDay = ref<number | null>(null)
const showModal = ref(false)
const showViewBookedModal = ref(false)
const selectedDay = ref<Date | null>(null)
const currentTime = ref(new Date())

const roomNumber = ref('')
const hourRate = ref('')
const roomType = ref('')
const fullname = ref('')
const phoneNumber = ref('')

const events = ref<{ date: Date, roomNumber: string, phoneNumber: string, hourRate: string, roomType: string, timeStamp: string, fullname:string, isCheckedIn: boolean }[]>([])

const updateTime = () => {
  currentTime.value = new Date()
}

onMounted(() => {
  const timer = setInterval(updateTime, 1000)
  onUnmounted(() => clearInterval(timer))
})

const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1)
  const days: Date[] = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const daysInMonth = getDaysInMonth(year, month)

  const currentMonthDays = daysInMonth.map((day) => {
    const eventsForDay = events.value.filter(e => e.date.getTime() === day.getTime())
    console.log(day.getDate(), eventsForDay) // Log each day and its corresponding events
    return {
      date: day.getDate(),
      isToday: isToday(day),
      event: eventsForDay
    }
  })

  return currentMonthDays
})

const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const openModal = (day: any) => {
  selectedDay.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.date)
  showModal.value = true
}

const openViewBookedModal = (day: any) => {
  selectedDay.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day.date)
  showViewBookedModal.value = true
}

const closeModal = () => {
  showModal.value = false;

  // Clear all input data upon modal closure
  roomNumber.value = '';
  hourRate.value = '';
  roomType.value = '';
  fullname.value = '';
  phoneNumber.value = '';
};

const closeViewBookedModal = () => {
  showViewBookedModal.value = false
}

const isBookingSuccessful = ref(false) // Ref to track if booking was successful

const saveEvent = () => {
  if (selectedDay.value) {
    const timeStamp = new Date().toLocaleString('en-PH')
    events.value.push({
      date: selectedDay.value,
      roomNumber: roomNumber.value,
      hourRate: hourRate.value,
      roomType: roomType.value,
      timeStamp: timeStamp,
      fullname: fullname.value,
      phoneNumber: phoneNumber.value,
      isCheckedIn: false // Initially, the booking is not checked in
    })

    console.log(events.value);  // Log the events array to check if it's getting updated correctly

    closeModal()

    isBookingSuccessful.value = true

    setTimeout(() => {
      isBookingSuccessful.value = false
    }, 3000)
  }
}

const checkIn = (event: any) => {
  event.isCheckedIn = true;
}

const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
})

const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('en-PH')
})

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const isSubmitted = ref(false)
</script>

<template>
  
    <div class="mt-8 w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div class="flex items-center justify-between bg-primary text-white p-2">
        <button @click="previousMonth" class="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10 bg-white text-blue-600 rounded-md">Previous</button>
        <span class="text-lg font-semibold">{{ currentDate.toLocaleString('en-PH', { month: 'long', year: 'numeric' }) }}</span>
        <button @click="nextMonth" class="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-12 bg-white text-blue-600 rounded-md">Next</button>
      </div>
  
      <div class="grid grid-cols-7 rounded-t-sm bg-primary text-white">
        <template v-for="day in days" :key="day">
          <div class="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5 first:rounded-tl-sm last:rounded-tr-sm">
            <span class="w-full h-full flex items-center justify-center">{{ day }}<span class="hidden lg:block"> day </span></span>
          </div>
        </template>
      </div>
  
      <div class="grid grid-cols-7">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="[
            'relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31',
            day.event.length > 0 ? 'bg-blue-200' : ''
          ]"
          @mouseenter="hoveredDay = index" @mouseleave="hoveredDay = null"
        >
          <div class="mx-auto flex h-24 w-10 flex-col overflow-hidden sm:w-full md:h-40 md:w-20 lg:w-28 2xl:w-40 relative">
            <span class="font-medium text-black dark:text-white">{{ day.date }}</span>
      
            <!-- Red Badge for booking -->
            <span v-if="day.event.length > 0" class="a  bsolute w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-xs text-red">
              {{ day.event.length }}
            </span>
          </div>
      
          <!-- Show buttons on hover -->
          <div v-if="hoveredDay === index" class="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-90 flex justify-center items-center z-50 space-x-2">
            <button @click="openModal(day)" class="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-xs hover:bg-opacity-90 lg:px-8 xl:px-10 bg-primary text-white rounded-md">Book Now</button>
            <button @click="openViewBookedModal(day)" class="inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-xs hover:bg-opacity-90 lg:px-8 xl:px-10 bg-primary text-white rounded-md">Booked Rooms</button>
          </div>
        </div>
      </div>
      
      </div>


  <!-- Modal Form -->
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-lg max-w-2xl w-full">
      <h2 class="text-lg font-bold mb-4">Book Date {{ selectedDay?.toDateString() }}</h2>
      
      <form @submit.prevent="saveEvent()">
        <!-- Form content -->
        <div class="mb-2">
          <label for="full-name" class="block text-sm font-medium text-gray-700">Name</label>
          <input id="full-name" type="text" v-model="fullname" placeholder="Name" class=" w-full rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary" required>
          <p v-if="isSubmitted && !fullname" class="text-red-500 text-sm mt-1">Please Fill in the Required</p>
        </div>
    
        <div class="mb-2">
          <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input id="phone-number" type="number" v-model="phoneNumber" placeholder="Phone Number" class="w-full rounded border border-gray-300 py-3 px-5 outline-none transition-all duration-200 ease-in-out focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500" required>
      </div>
  

        <div class="grid grid-cols-3 gap-4">
          <!-- Hour Rate -->
          <div class="mb-2">
            <label for="hour-rate" class="block text-sm font-medium text-gray-700">Hour Rate</label>
            <select id="hour-rate" v-model="hourRate" class="w-full rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary" required>
              <option disabled value="">Select an hour rate</option>
              <option>6 Hrs</option>
              <option>12 Hrs</option>
              <option>24 Hrs</option>
            </select>
            <!-- Validation message -->
            <p v-if="isSubmitted && !hourRate" class="text-red-500 text-sm mt-1">Please select an hour rate.</p>
          </div>
    
          <!-- Room Type -->
          <div class="mb-2">
            <label for="room-type" class="block text-sm font-medium text-gray-700">Room Type</label>
            <select id="room-type" v-model="roomType" class="w-full rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary" required>
              <option disabled value="">Select a room type</option>
              <option>Single Room</option>
              <option>Double Room</option>
              <option>Suite</option>
            </select>
            <!-- Validation message -->
            <p v-if="isSubmitted && !roomType" class="text-red-500 text-sm mt-1">Please select a room type.</p>
          </div>

          <div class="mb-2">
            <label for="room-number" class="block text-sm font-medium text-gray-700">Room Number</label>
            <select id="room-number" v-model="roomNumber" class="w-full rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary" required>
              <!--Data should be fetch from the available rooms -->
              <option disabled value="">Select room Num</option>
              <option>001</option>
              <option>001</option>
              <option>001</option>
            </select>
            <!-- Validation message -->
            <p v-if="isSubmitted && !roomNumber" class="text-red-500 text-sm mt-1">Please select Room Number.</p>
          </div>
        </div>
  
    
        <div class="mb-2">
          <label for="current-time" class="block text-sm font-medium text-gray-700">Current Date and Time</label>
          <input id="current-time" type="text" :value="`${formattedDate} ${formattedTime}`" class="mt-1 block w-full rounded-sm border-gray-0 shadow-sm sm:text-sm focus:outline-none focus:ring-0" readonly>
      </div>
    
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="text-gray-700 bg-gray-300 px-4 py-2 rounded-md mr-2">Cancel</button>
          <button type="submit" class="text-white bg-primary px-4 py-2 rounded-md">Save</button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="isBookingSuccessful" class="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
    <div class="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z" fill="white" stroke="white"></path>
      </svg>
    </div>
    <div class="w-full">
      <h5 class="mb-3 text-lg font-bold text-black dark:text-[#34D399]">Message Sent Successfully</h5>
      <p class="text-base leading-relaxed text-body">Your booking has been successfully saved.</p>
    </div>
  </div>
  
  <!-- View Booked Rooms Modal -->
  <div v-if="showViewBookedModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-md shadow-lg max-w-2xl w-full">
      <h2 class="text-xl font-bold mb-4">Booked Rooms for ( {{ selectedDay?.toDateString() }} )</h2>
      <ul class="max-h-70 overflow-y-auto">
        <li v-for="event in events.filter(e => e.date.toDateString() === selectedDay?.toDateString())" :key="event.timeStamp" class="border-b border-gray-300 mb-2 pb-2">
          <p><strong>Name:</strong> {{ event.fullname}}</p>
          <p><strong>Phone Number:</strong> {{ event.phoneNumber}}</p>
          <p><strong>Room Type:</strong> {{ event.roomType }}</p>
          <p><strong>Hour Rate:</strong> {{ event.hourRate }}</p>
          <p><strong>Room Number:</strong> {{ event.roomNumber }}</p>
          <p><strong>Time:</strong> {{ event.timeStamp }}</p>
          <div v-if="!event.isCheckedIn" class="mt-2">
            <button @click="checkIn(event)" class="bg-green-500 text-white px-4 py-2 rounded-md">
              Check In
            </button>
          </div>
          <div v-else class="text-green-600 font-bold mt-2">
            Checked In
          </div>
        </li>
      </ul>
     


      <button @click="closeViewBookedModal" class=" mt-6 inline-flex items-center justify-center gap-2.5 py-4 px-10 text-center font-sm hover:bg-opacity-90 lg:px-8 xl:px-10 bg-primary text-white rounded-md">Close</button>
    </div>
  </div>

  
</template>

<style scoped>
/* Add custom scrollbar styling for WebKit-based browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

</style>