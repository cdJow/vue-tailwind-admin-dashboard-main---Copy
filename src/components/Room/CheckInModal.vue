
<script lang="ts">
import { defineComponent, ref, computed, type PropType } from 'vue';

interface Invoice {
  Hours: number;
  Rate: number;
  additionalCharges: number;
}

interface Room {
  id: number;
  number: string;
  size: string;
  status: 'available' | 'occupied' | 'booked' | 'unavailable' | 'cleaning';
  amenities: Record<string, number>;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  checkOutTime?: string;
  extraAmenities?: Record<string, number>;

  bookingDetails: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
}

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    room: {
      type: Object as PropType<Room | null>,
      required: false,
      default: null,
    },
    onBooking: {
      type: Function as PropType<(data: Room & { fullName: string; phoneNumber: string; email: string; checkOutTime: string; selectedAmenities: Record<string, number> }) => void>,
      required: true,
    },
    onBookingCheckIn: {
      type: Function as PropType<(data: Room & { invoice: number; fullName: string; phoneNumber: string; email: string; checkOutTime: string; selectedAmenities: Record<string, number> }) => void>,
      required: true,
    },
    updateShow: {
      type: Function,
      required: true,
    },
    bookingDetails: {
      type: Object,
      required: true,
      default: () => ({}), // provide an empty object as default value
    },
  },
  emits: ['update:show', 'close'],

  setup(props) {
    const invoice = ref<Invoice>({
      Hours: 1,
      Rate: 100,
      additionalCharges: 0,
    });

    const fullName = ref(props.room?.fullName || '');
    const phoneNumber = ref(props.room?.phoneNumber || '');
    const email = ref(props.room?.email || '');

    const calculateTotal = computed(() => {
      return invoice.value.Rate * invoice.value.Hours + invoice.value.additionalCharges;
    });

    const checkOutTime = computed(() => {
      const now = new Date();
      return new Date(now.getTime() + invoice.value.Hours * 60 * 60 * 1000);
    });

    const handleBooking = () => {
      if (invoice.value.Hours <= 0 || invoice.value.Rate < 0 || invoice.value.additionalCharges < 0) {
        alert('Please enter valid invoice details.');
        return;
      }

      if (props.room) {
        props.onBooking({
          ...props.room,
          status: 'booked',
          fullName: fullName.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          checkOutTime: checkOutTime.value.toISOString(),
          selectedAmenities: props.room.extraAmenities || {},
        });

        // Close the modal after booking
        props.updateShow(false);
      }
    };

    const handleBookingCheckIn = () => {
      if (props.room) {
        props.onBookingCheckIn({
          ...props.room,
          status: 'occupied',
          invoice: calculateTotal.value,
          fullName: props.bookingDetails.fullName,
          phoneNumber: props.bookingDetails.phoneNumber,
          email: props.bookingDetails.email,
          checkOutTime: checkOutTime.value.toISOString(),
          selectedAmenities: props.room.extraAmenities || {},
        });

        // Close the modal after check-in
        props.updateShow(false);
      }
    };

    return {
      invoice,
      fullName,
      phoneNumber,
      email,
      calculateTotal,
      handleBooking,
      handleBookingCheckIn,
      checkOutTime,
    };
  },
});
</script>


<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" v-if="show">
    <div class="relative bg-white rounded-lg p-6 w-full max-w-4xl">
      <!-- Close Button Positioned in the Top Right -->
      <button 
        @click="() => { $emit('close'); }" 
        class="absolute top-4 right-4 text-gray-500 hover:text-red"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 class="text-lg font-semibold mb-4 text-center">
        {{ room?.status === 'available' ? 'Book Room' : 'Check In Room' }}
      </h3>

      <!-- Two-Column Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Column 1: Room and Guest Information -->
        <div>
          <h4 class="font-semibold text-slate-700">Room Details</h4>
          <p v-if="room">Room Number: {{ room.number }}</p>
          <p v-if="room">Room Size: {{ room.size }}</p>
          <p v-if="room">Room Status: {{ room.status }}</p>

          <h4 class="mt-4 font-semibold text-slate-700">Guest Information</h4>
          <p>Full Name: {{ bookingDetails.fullName }}</p>
          <p>Phone Number: {{ bookingDetails.phoneNumber }}</p>
          <p>Email: {{ bookingDetails.email }}</p>
        </div>

        <!-- Column 2: Invoice Details -->
        <div>
        
          <label class="block mt-2">
            Hours to Stay:
            <select v-model="invoice.Hours" 
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                
            >
              <option value="null" disabled selected>Select hours</option>
              <option value="6">6 Hours</option>
              <option value="12">12 Hours</option>
              <option value="24">24 Hours</option>
            </select>
          </label>
          
          
          <label class="block mt-2">
            Rate per Hour:
            <input type="number" v-model="invoice.Rate" min="0" 
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                 
            />
          </label>
          <label class="block mt-2">
            Additional Charges:
            <input type="number" v-model="invoice.additionalCharges" min="0" 
            class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                 
            />
          </label>
          <p class="mt-4"><strong>Total: ₱{{ calculateTotal }}</strong></p>
          <p><strong>Check-Out Time: {{ checkOutTime.toLocaleString() }}</strong></p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-4 flex justify-end space-x-2">
        <button v-if="room?.status === 'available'" @click="handleBooking" class="bg-blue-500 text-white px-4 py-2 rounded">
          Confirm Booking
        </button>
        <button v-if="room?.status === 'booked'" @click="handleBookingCheckIn" 
          class="bg-green-500 text-white rounded-full text-xs w-1/5 h-10 flex items-center justify-center hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2" 
        >
          Confirm Check In
        </button>
      </div>
    </div>
  </div>
</template>
