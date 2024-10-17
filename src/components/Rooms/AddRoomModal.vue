<script>
    export default {
      data() {
        return {
          step: 1, // To track the current step
          newRoom: {
            number: '',
            roomSize: '',
            paymentMethod: '',
            // other fields
          },
        };
      },
      methods: {
        nextStep() {
          if (this.step < 4) {
            this.step++;
          }
        },
        previousStep() {
          if (this.step > 1) {
            this.step--;
          }
        },
        saveRoom() {
          // handle form submission
          console.log('Room details:', this.newRoom);
          this.closeRoomForm();
        },
        closeRoomForm() {
          this.step = 1; // Reset the step when closing
          this.showRoomForm = false;
        },
      },
    };
    </script>
    


<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full">
      <!-- Breadcrumbs -->
      <div class="flex justify-between p-4">
        <div class="flex items-center space-x-4">
          <div :class="step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'" class="p-2 rounded-full">1</div>
          <span>Contact Details</span>
        </div>
        <div class="flex items-center space-x-4">
          <div :class="step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'" class="p-2 rounded-full">2</div>
          <span>Guest Details</span>
        </div>
        <div class="flex items-center space-x-4">
          <div :class="step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'" class="p-2 rounded-full">3</div>
          <span>Review Booking</span>
        </div>
        <div class="flex items-center space-x-4">
          <div :class="step >= 4 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'" class="p-2 rounded-full">4</div>
          <span>Payment & Bill</span>
        </div>
      </div>

      <!-- Form Content based on Step -->
      <div v-if="step === 1">
        <!-- Contact Details Content -->
        <h2 class="bg-blue-500 p-9 text-white rounded-t-lg font-bold text-2xl mb-4">Contact Details</h2>
        <form @submit.prevent="nextStep">
          <div class="pb-5 pl-9 pr-9">
            <!-- Your fields here -->
            <label>Room Number:</label>
            <input v-model="newRoom.number" type="number" class="w-full mb-4" />
            <!-- Other fields -->
          </div>
          <div class="flex justify-end pb-5">
            <button type="submit" class="px-8 py-3 bg-blue-500 text-white rounded-lg">Next</button>
          </div>
        </form>
      </div>

      <div v-if="step === 2">
        <!-- Guest Details Content -->
        <h2 class="bg-blue-500 p-9 text-white rounded-t-lg font-bold text-2xl mb-4">Guest Details</h2>
        <form @submit.prevent="nextStep">
          <div class="pb-5 pl-9 pr-9">
            <!-- Guest details fields -->
            <label>Room Size:</label>
            <select v-model="newRoom.roomSize" class="w-full mb-4">
              <!-- Options -->
            </select>
            <!-- Other fields -->
          </div>
          <div class="flex justify-between pb-5">
            <button type="button" @click="previousStep" class="px-8 py-3 bg-gray-500 text-white rounded-lg">Back</button>
            <button type="submit" class="px-8 py-3 bg-blue-500 text-white rounded-lg">Next</button>
          </div>
        </form>
      </div>

      <div v-if="step === 3">
        <!-- Review Booking Content -->
        <h2 class="bg-blue-500 p-9 text-white rounded-t-lg font-bold text-2xl mb-4">Review Booking</h2>
        <form @submit.prevent="nextStep">
          <div class="pb-5 pl-9 pr-9">
            <!-- Review fields -->
            <p>Review all details before submitting.</p>
          </div>
          <div class="flex justify-between pb-5">
            <button type="button" @click="previousStep" class="px-8 py-3 bg-gray-500 text-white rounded-lg">Back</button>
            <button type="submit" class="px-8 py-3 bg-blue-500 text-white rounded-lg">Next</button>
          </div>
        </form>
      </div>

      <div v-if="step === 4">
        <!-- Payment & Bill Content -->
        <h2 class="bg-blue-500 p-9 text-white rounded-t-lg font-bold text-2xl mb-4">Payment & Bill</h2>
        <form @submit.prevent="saveRoom">
          <div class="pb-5 pl-9 pr-9">
            <!-- Payment fields -->
            <label>Payment Method:</label>
            <select v-model="newRoom.paymentMethod" class="w-full mb-4">
              <!-- Options -->
            </select>
          </div>
          <div class="flex justify-between pb-5">
            <button type="button" @click="previousStep" class="px-8 py-3 bg-gray-500 text-white rounded-lg">Back</button>
            <button type="submit" class="px-8 py-3 bg-green-500 text-white rounded-lg">Finish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
