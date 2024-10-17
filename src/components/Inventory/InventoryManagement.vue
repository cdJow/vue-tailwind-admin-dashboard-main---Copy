<script setup lang="ts">
import { ref } from 'vue';
import AlertSuccess from '../Alerts/AlertSuccess.vue';

// Modal visibility state
const showModal = ref<boolean>(false);
const showSuccessMessage = ref<boolean>(false); // Controls the success message visibility

const packages = ref<Array<{ 
  id: string; 
  name: string; 
  description: string;
  category:string;
  UnitofMeasurement: string; 
  QuantityonHand: string; 
  SupplierName: string; 
  CostperPack: string; 
  srp: string; 
  ArrivalDate: string; 
  ExpirationDate: string;
  stocks?: string // Optional property to hold stock value
}>>([]);

// Data for the form (new product)
const newProduct = ref({
  id: '',
  name: '',
  description: '',
  category: '',
  UnitofMeasurement: '',
  QuantityonHand: '',
  SupplierName: '',
  CostperPack: '',
  srp: '',
  ArrivalDate: '',
  ExpirationDate: '',
});



// Function to open the modal for adding a new product
const openModal = () => {
  // Reset the form data and hide success message when opening modal
  newProduct.value = {
    id: '',
    name: '',
    description: '',
    category: '',
    UnitofMeasurement: '',
    QuantityonHand: '',
    SupplierName: '',
    CostperPack: '',
    srp: '',
    ArrivalDate: '',
    ExpirationDate: '',
  };
  showModal.value = true;
  showSuccessMessage.value = false; // Hide success message when the modal opens
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

// Generate a unique ID for the product
const generateUniqueId = () => {
  return 'ID-' + Math.random().toString(36).substr(2, 9);
};

// Function to submit the new product form
const submitProduct = () => {
  if (
    newProduct.value.name &&
    newProduct.value.description &&
    newProduct.value.category &&
    newProduct.value.UnitofMeasurement &&
    newProduct.value.QuantityonHand &&
    newProduct.value.SupplierName &&
    newProduct.value.CostperPack &&
    newProduct.value.ArrivalDate &&
    newProduct.value.ExpirationDate &&
    newProduct.value.srp
  ) {
    // Generate and assign a unique ID to the new product
    newProduct.value.id = generateUniqueId();
    
    // Push the new product into the packages array
    packages.value.push({ ...newProduct.value });
    
    // Close the modal and show the success message
    closeModal();
    showSuccessMessage.value = true; 
  } else {
    alert('Please fill out all required fields before submitting.');
  }
};

// Declare the search query
const searchQuery = ref('');


</script>

<template>
  <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <button
      @click="openModal"
      class="w-full sm:w-auto rounded-lg border-[1.5008px] text-white border-stroke bg-blue-400 py-3 px-5 font-normal outline-none"
    >
      Add New Product
    </button>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="w-full sm:w-auto rounded-lg border-[1.5008px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
    />
  </div>

  <!-- Success Message -->
  <AlertSuccess v-if="showSuccessMessage" />

  <!-- Add New Product Modal -->
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white  rounded-lg shadow-lg max-w-4xl w-full">
      
      <h2 class=" bg-blue-500 text-lg  text-white font-bold  rounded-t-lg p-9 mb-6">Add New Product</h2>

      <form @submit.prevent="submitProduct">
        <div class=" pb-5 pl-9 pr-9 grid grid-cols-3 gap-6">
          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Product Name</label>
              <input v-model="newProduct.name" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Product Name"
              required>
            </div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Description</label>
              <input v-model="newProduct.description" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Description"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Category</label>
              <select v-model="newProduct.category"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
              required> 
              <option value="" disabled>Select Category</option>
                <option value="Consumable">Consumable</option>
                <option value="Non-Consumables">Non-Consumable</option>
               
              </select>
            </div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Unit of Measurement</label>
              <input v-model="newProduct.UnitofMeasurement" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Unit of Measurement"
              required></div>
          </div>

          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Quantity on Hand</label>
              <input v-model="newProduct.QuantityonHand" type="number" class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Quantity on Hand"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Supplier Name</label>
              <input v-model="newProduct.SupplierName" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Supplier Name"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Cost per Pack</label>
              <input v-model="newProduct.CostperPack" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Cost Per Pack"
              required></div>
          </div>

          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">SRP</label>
              <input v-model="newProduct.srp" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="SRP"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Arrival Date</label>
              <input v-model="newProduct.ArrivalDate" type="date"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Expiration Date</label>
              <input v-model="newProduct.ExpirationDate" type="date"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required></div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6 pb-5 pl-9 pr-9">
          <button type="button" @click="closeModal" class="px-6 py-3 text-black border-red rounded-lg">Cancel</button>
          <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded-xl">Submit</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Product Table -->
  <div class="rounded-lg border border-stroke bg-white pt-6 pb-2.5 shadow-default mt-6">
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto min-w-[800px]">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Product ID</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Product Name</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-xs">Description</th>
            <th class="min-w-[90px] py-4  font-medium text-xs">Category</th>
            <th class="min-w-[100px] py-4  font-medium text-xs">Unit of Measurement</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Quantity on Hand</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Supplier Name</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Cost per Pack</th>
            <th class="min-w-[10px] py-4 px-4 font-medium text-xs">SRP</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Arrival Date</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in packages" :key="index">
            <td class="py-5 px-4 text-xs">{{ item.id }}</td>
            <td class="py-5 px-4 text-xs">{{ item.name }}</td>
            <td class="py-5 px-4 text-xs">{{ item.description }}</td>
            <td class="py-5 px-4 text-xs">{{ item.category }}</td>
            <td class="py-5 px-4 text-xs">{{ item.UnitofMeasurement }}</td>
            <td class="py-5 px-4 text-xs">{{ item.QuantityonHand }}</td>
            <td class="py-5 px-4 text-xs">{{ item.SupplierName}}</td>
            <td class="py-5 px-4 text-xs">{{ item.CostperPack }}</td>
            <td class="py-5 px-4 text-xs">{{ item.srp }}</td>
            <td class="py-5 px-4 text-xs text-green-600">{{ item.ArrivalDate }}</td>
            <td class="py-5 px-4 text-xs text-red">{{ item.ExpirationDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  

</template>
