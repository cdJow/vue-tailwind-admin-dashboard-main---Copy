<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Define types for props
interface NewRoom {
  roomNumber: string;
  roomSize: string;
  Description: string;
  filename: string;
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

// Props definition
const props = defineProps<{
  modelValue: boolean; // Control modal visibility
  newRoom: NewRoom; // Room data to be passed in
}>();

// Emits for event handling
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
  (e: 'roomBooked', roomDetails: NewRoom): void;
}>();

// Track the current form step
const step = ref(1);

// Clone the newRoom prop to work with local form data
const roomDetails = ref<NewRoom>({ ...props.newRoom });

// Track selected features (floor selections)
const selectedFeatures = ref<Record<string, boolean>>({
  '1stfloor': false,
  '2ndfloor': false,
  '3rdfloor': false,
  '4thfloor': false,
});

// Watch for changes to the props and update roomDetails
watch(
  () => props.newRoom,
  (newRoom) => {
    roomDetails.value = { ...newRoom }; // Sync with prop changes
  },
  { immediate: true }
);

// Computed property for modal visibility
const isVisible = computed(() => props.modelValue);

// Reactive variables to hold filename and image URL
const filename = ref('');
const imageUrl = ref<string | null>(null); // URL for previewing the image

// Method to handle file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]; // Get the first file
    filename.value = file.name; // Set the filename for display

    // Create a URL for the uploaded image
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string; // Set the image URL for preview
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
};

// Display selected floors for summary
const displaySelectedFloors = () => {
  const selectedFloors = Object.entries(selectedFeatures.value)
    .filter(([, value]) => value) // Get floors that are selected (true)
    .map(([key]) => key.replace('floor', ' Floor')); // Format keys (e.g., '1stfloor' -> '1st Floor')

  return selectedFloors.length > 0 ? selectedFloors.join(', ') : 'No floor selected';
};

// Move to the next step in the form
const nextStep = () => {
  if (step.value < 4) {
    step.value++;
  }
};


// Save the room details and emit the event
const saveRoom = () => {
  const roomData = {
    ...roomDetails.value,
    filename: filename.value, // Include the filename
    imageUrl: imageUrl.value, // Include the image URL
    selectedFeatures: selectedFeatures.value, // Include selected features
  };
  emit('roomBooked', roomData); // Emit the updated room data
  closeModal(); // Close the modal after saving
};

// Reset form and close modal
const closeModal = () => {
  resetForm(); // Reset form fields
  emit('update:modelValue', false); // Emit event to close the modal
};

// Reset form to initial state
const resetForm = () => {
  step.value = 1;
  roomDetails.value = { ...props.newRoom }; // Reset to initial room data
  selectedFeatures.value = {
    '1stfloor': false,
    '2ndfloor': false,
    '3rdfloor': false,
    '4thfloor': false,
  }; // Reset selected floors
  imageUrl.value = null; // Reset image preview
  filename.value = ''; // Reset filename
};
</script>

<style scoped>
.image-preview {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}

.close {
  cursor: pointer;
}
</style>
<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-6xl ">
      <!-- Breadcrumbs -->
      <div class="p-6 flex justify-between items-center">
        <!-- Step 1 -->
        <div class="flex items-center">
          <div class="relative flex items-center">
            <!-- Circle for Step 1 -->
            <div :class="step >= 1 ? 'bg-gradient-to-r from-red to-orange-600 text-white' : 'bg-gray-200 text-gray-500'" class="w-8 h-8 flex justify-center items-center rounded-full">
              1
            </div>
            <!-- Line to the next step -->
            <div class="absolute w-full left-8 h-1" :class="step >= 2 "></div>
          </div>
          <span :class="step >= 1 ? 'text-orange-500' : 'text-gray-500'" class="ml-2">Add Room & Rates</span>
        </div>
      
        <!-- Step 2 -->
        <div class="flex items-center">
          <div class="relative flex items-center">
            <!-- Circle for Step 2 -->
            <div :class="step >= 2 ? 'bg-gradient-to-r from-red to-orange-600 text-white' : 'bg-gray-200 text-gray-500'" class="w-8 h-8 flex justify-center items-center rounded-full">
              2
            </div>
            <!-- Line to the next step -->
            <div class="absolute w-full left-8 h-1" :class="step >= 3 "></div>
          </div>
          <span :class="step >= 2 ? 'text-orange-600' : 'text-gray-500'" class="ml-2">Assign Aminities</span>
        </div>
      
        <!-- Step 3 -->
        <div class="flex items-center">
          <div class="relative flex items-center">
            <!-- Circle for Step 3 -->
            <div :class="step >= 3 ? 'bg-gradient-to-r from-red to-orange-600 text-white' : 'bg-gray-200 text-gray-500'" class="w-8 h-8 flex justify-center items-center rounded-full">
              3
            </div>
          </div>
          <span :class="step >= 3 ? 'text-orange-600' : 'text-gray-500'" class="ml-2">Confirm Details</span>
        </div>
      </div>
      

      <!-- Step 1:  -->

      <div v-if="step === 1">
        <h2 class="bg-gradient-to-r from-red to-orange-600 px-8 py-2 text-white font-bold text-2xl mb-4">Add Room Number & Rates:</h2>
        <form @submit.prevent="nextStep" autocomplete="off">
          <div class=" grid grid-cols-3 gap-6 pb-5 pl-9 ">

            <div>
   
              <div class="col-span-1 mt-4 w-1/2 pr-4">
                <label class="block mb-2 font-semibold text-sm text-gray-700">Upload Room Image</label>
                <label class="custom-file-upload bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition">
                  <input
                    type="file"
                    @change="handleFileUpload"
                    name="uploadedFile"
                    accept="image/*"
                    class="hidden"
                    required
                  />
                  Choose File
                </label>
                <br><br>
                <span class="file-chosen text-sm text-gray-600">{{ filename }}</span>
            
                <!-- Image Preview -->
                <div v-if="imageUrl" class="mt-2">
                  <img :src="imageUrl" alt="Uploaded Room Image" class="rounded-lg h-32 object-cover" />
                </div>
              </div>
              
            </div>
            <div>

              <div class="mb-4">
                <label class="block mb-2 font-semibold text-sm">Room Number</label>
                <input  v-model="roomDetails.roomNumber"  type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-orange-600 active:border-orange-600 dark:text-white" placeholder="Room Number"
                required>
              </div>
              <div class="mb-4">
                <label class="block mb-2 font-semibold text-sm">Description</label>
                <input  v-model="roomDetails.Description" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-orange-600 active:border-orange-600 dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Description"
                required>
              </div>
                <div class="mb-4">
                  <label class="block mb-2 font-semibold text-sm">Room Size</label>
                  <select v-model="roomDetails.roomSize"
                    class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-orange-600 active:border-orange-600 dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required>
                   
                    <option value="" disabled selected>Choose Room Size</option>
                    <option value="Single Size Bed">Single Size Bed</option>
                    <option value="Double Size Bed">Double Size Bed</option>
                    <option value="Family Size Bed">Family Size Bed</option>
                    <option value="Delux Size Bed">Delux Size Bed</option>
                    <option value="VIP Size Bed">VIP Size Bed</option>
                  </select>
                </div>

                
            </div>
            
            <div class="mr-9">
              <div class="gap-2 mb-4">
                

                <div>

                  <div class="mb-12">
                    <label class="block mb-2 font-semibold text-sm">Status</label>
                    <select
                      v-model="roomDetails.Status"
                      class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-orange-600 active:border-orange-600 dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required>
                      <option value="" disabled selected>Status</option>
                      <option value="Available">Available</option>
                     
                      <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                  </div>
                 


                  <div>
                    <label class="block mb-2 font-semibold text-sm">Select Floor Section</label>
                    <div class="grid grid-cols-9 gap-9 mt-2">
                      <div class="col-span-2 flex items-center mb-2">
                        <input v-model="selectedFeatures['1stfloor']" type="checkbox" id="1st" class="mr-2" />
                        <label for="1st" class="text-sm">1st</label>
                      </div>
                      <div class=" col-span-2 flex items-center mb-2">
                        <input v-model="selectedFeatures['2ndfloor']" type="checkbox" id="2nd" class="mr-2" />
                        <label for="2nd" class="text-sm">2nd</label>
                      </div>
                      <div class=" col-span-2 flex items-center mb-2">
                        <input v-model="selectedFeatures['3rdfloor']" type="checkbox" id="3rd" class="mr-2" />
                        <label for="3rd" class="text-sm">3rd</label>
                      </div>
                      <div class="col-span-2 flex items-center mb-2">
                        <input v-model="selectedFeatures['4thfloor']" type="checkbox" id="4th" class="mr-2" />
                        <label for="4th" class="text-sm">4th</label>
                      </div>
                    </div>
                  </div>
                  
                </div>

                
                
                
              </div>
            </div>
           
          </div>
          <div class="flex justify-end pb-5 px-8">
            <button type="button" @click="closeModal" class="px-8 py-3 bg-red-500 text-black rounded-lg">Cancel</button>
            <button type="submit" class="px-8 py-3 bg-blue-500 text-white rounded-lg">Next</button>
          </div>
        </form>
      </div>

      <!-- Step 2: >Assign Aminities -->
      <div v-if="step === 2" >
        <h2 class="bg-gradient-to-r from-red to-orange-600 px-8 py-2 text-white  font-bold text-2xl mb-4">Assign Aminities</h2>
        <div></div>
        <form @submit.prevent="nextStep">
          <div class="grid grid-cols-3 gap-2">

            
          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Mattress</label>
                <select  v-model="roomDetails.Mattress"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Mattress</option>
                  <option value="Mattress 1">Mattress 1</option>
                  <option value="Mattress 2">Mattress 2</option>
                </select>
                </div>

               <div class="">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.MattressQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Blankets</label>
                <select v-model="roomDetails.Blankets"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Blankets</option>
                  <option value="Blanket 1">Blanket 1</option>
                  <option value="Blanket 2">Blanket 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.BlanketsQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Pillows</label>
                <select v-model="roomDetails.Pillows"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Pillows</option>
                  <option value="pillows 1">pillows 1</option>
                  <option value="pillows 1">pillows 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.PillowsQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>



            
          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Bed</label>
                <select v-model="roomDetails.Bed"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available beds</option>
                  <option value="bed 1">bed 1</option>
                  <option value="bed 2">bed 2</option>
                </select>
                </div>

               <div class="">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.BedQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Curtains</label>
                <select v-model="roomDetails.Curtains"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Curtains</option>
                  <option value="Curtains 1">Curtains 1</option>
                  <option value="Curtains 2">Curtains 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.CurtainsQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add table</label>
                <select v-model="roomDetails.Table"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available tables</option>
                  <option value="table 1">table 1</option>
                  <option value="table 2">table 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.TableQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>

            
          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Chair</label>
                <select v-model="roomDetails.Chair"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Chairs</option>
                  <option value="Chair 1">Chair 1</option>
                  <option value="Chair 2">Chair 2</option>
                </select>
                </div>

               <div class="">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.ChairQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add TV</label>
                <select v-model="roomDetails.TV"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available TV's</option>
                  <option value="TV 1">TV 1</option>
                  <option value="TV 2">TV 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.TVQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Light Bulb</label>
                <select v-model="roomDetails.Lightbulb"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Light Bulb</option>
                  <option value="Light Bulb 1">Light Bulb 1</option>
                  <option value="Light Bulb 2">Light Bulb 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.LightbulbQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>



            
          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add AC</label>
                <select v-model="roomDetails.AC"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available AC's</option>
                  <option value="AC 1">AC 1</option>
                  <option value="AC 1">AC 2</option>
                </select>
                </div>

               <div class="">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.ACQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>


          <div class="pl-9">
            <div class="mb-4">
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <label class="block mb-2 font-semibold text-xs">Add Mirror</label>
                <select v-model="roomDetails.Mirror"
                  class=" text-xs w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-2 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required>
                  <option value="" disabled selected>Available Mirror</option>
                  <option value="Mirror 1">Mirror 1</option>
                  <option value="Mirro 2">Mirro 2</option>
                </select>
                </div>

               <div class="content-end">
                  <label class="mb-2 font-semibold text-xs">Quantity</label>
                  <input
                   v-model="roomDetails.MirrorQuantity"
                    type="number"
                    min="0"
                    value="0"
                    class="  text-xs w-3/4  rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required />
                </div>
              </div>
            </div>
          </div>



          <div class="pl-9">
            <div class="mb-4">
              <div>
                <div class="grid grid-cols-4 gap-9 mt-2">
                  <!-- Wifi Available -->
                  <div class="flex items-center mb-2">
                    <input 
                      v-model="roomDetails.WifiStatus" 
                      type="radio" 
                      id="wifi-available" 
                      value="Available" 
                      class="mr-2"
                    >
                    <label for="wifi-available" class="text-sm">Wifi Available</label>
                  </div>
          
                  <!-- Wifi Not Available -->
                  <div class="flex items-center mb-2">
                    <input 
                      v-model="roomDetails.WifiStatus" 
                      type="radio" 
                      id="wifi-not-available" 
                      value="Not Available" 
                      class="mr-2"
                    >
                    <label for="wifi-not-available" class="text-sm">Wifi Not Available</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        

        </div>
        



          <div class="flex justify-end pb-5 px-8">
            <button type="button" @click="closeModal" class="px-8 py-3 bg-red-500 text-black rounded-lg">Cancel</button>
            <button type="submit" class="px-8 py-3 bg-blue-500 text-white rounded-lg">Next</button>
          </div>
        </form>
      </div>

      <!-- Step 3: Review Booking -->
      <div v-if="step === 3">
        <h2 class=" bg-gradient-to-r from-red to-orange-600 px-8 py-2 text-white font-bold text-2xl mb-4">
          Review Details
        </h2>
        <form @submit.prevent="nextStep">
          <div class="pb-5 pl-2 pr-2">
            <div class="grid grid-cols-9 gap-2  overflow-hidden">
              <div class="col-span-4">
                <div v-if="imageUrl">
                  <div class=" relative w-full h-90  overflow-hidden rounded-md shadow-10">
                    <img :src="imageUrl" alt="Uploaded Room Image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full" />
                  </div>
                </div>
              </div>
           
                    <div class="col-span-2">
                      <div >
                        <div  class=" h-45 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                          <div class="  py-2 px-2  bg-gradient-to-r from-red to-orange-600">
                            <div class="col-span-2 flex items-center">
                              <p class=" text-white font-bold">Room Details</p>
                            </div>

                            
                            
                          </div>
      
                          <div >
                            <td class="py-2 px-2  text-justify">
                              <p class=" text-gray-700">Room Number:  {{ roomDetails.roomNumber }}</p>
                              <p class="text-gray-700">Description:  {{ roomDetails.Description }}</p>
                              <p class="text-gray-700">Room Size:  {{ roomDetails.roomSize }}</p>
                              <p class="text-gray-700">Status:  {{ roomDetails.Status }}</p>
                              <p class="text-gray-700">Floor Section:  {{ displaySelectedFloors() }}</p>

                              </td>
                          </div>
                        </div>
                      </div>
                      
                     
                    </div>
                   
                    

                    <div class="col-span-3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div class="">
                        <div class="grid grid-cols-8 py-2 px-2 bg-gradient-to-r from-red to-orange-600 sm:grid-cols-8 md:px-6 2xl:px-7.5">
                          <div class="col-span-5 flex items-center">
                            <p class="font-bold text-white">Room Aminities</p>
                          </div>

                          <div class="col-span-2 flex items-center">
                            <p class="font-bold text-white">Quantity</p>
                          </div>
                        </div>
                        
                     
    
                        <div class="grid grid-cols-3">
                          <td class="col-span-2 py-2 px-6  text-justify">
                            <p class="text-gray-700">Mattress: {{ roomDetails.Mattress }}</p>
                            <p class="text-gray-700">Blankets: {{ roomDetails.Blankets }}</p>
                            <p class="text-gray-700">Pillows: {{ roomDetails.Pillows }}</p>
                            <p class="text-gray-700">Bed: {{ roomDetails.Bed }}</p>
                            <p class="text-gray-700">Curtains: {{ roomDetails.Curtains }}</p>
                            <p class="text-gray-700">Table: {{ roomDetails.Table }}</p>
                            <p class="text-gray-700">Chair: {{ roomDetails.Chair }}</p>
                            <p class="text-gray-700">TV: {{ roomDetails.TV }}</p>
                            <p class="text-gray-700">Lightbulb:{{ roomDetails.Lightbulb }}</p>
                            <p class="text-gray-700">AC: {{ roomDetails.AC }}</p>
                            <p class="text-gray-700">Mirror: {{ roomDetails.Mirror }}</p>
                            <p class="text-gray-700">Wifi: {{ roomDetails.WifiStatus }}</p> 
                          </td>

                          <td class="py-2 px-6  text-justify">
                            <p class="text-gray-700">{{ roomDetails.MattressQuantity }}</p>
                            <p class="text-gray-700">{{ roomDetails.BlanketsQuantity }}</p>
                            <p class="text-gray-700">{{ roomDetails.PillowsQuantity }}</p>
                            <p class="text-gray-700"> {{ roomDetails.BedQuantity }}</p>
                            <p class="text-gray-700">{{ roomDetails.CurtainsQuantity }}</p>
                            <p class="text-gray-700">{{ roomDetails.TableQuantity }}</p>
                            <p class="text-gray-700"> {{ roomDetails.ChairQuantity }}</p>
                            <p class="text-gray-700"> {{ roomDetails.TVQuantity }}</p>
                            <p class="text-gray-700"> {{ roomDetails.LightbulbQuantity }}</p>
                            <p class="text-gray-700">{{ roomDetails.ACQuantity }}</p>
                            <p class="text-gray-700">{{ roomDetails.MirrorQuantity }}</p>
                            <p class="text-gray-700">-</p>
                            
                        
                        
                           
                          </td>
                        </div>

                      </div>
                      
                    </div>
          </div>
          </div>
      
          <div class="flex justify-end pb-5 px-8">
            <button type="button" @click="closeModal" class="px-8 py-3 bg-red-500 text-black rounded-lg">Cancel</button>
            <button type="submit" @click="saveRoom" class="px-8 py-3 bg-green-500 text-white rounded-lg">Finish</button>
          </div>
        </form>
      </div>
      
      </div>
    </div>

</template>

<style scoped>
.p-2 {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
