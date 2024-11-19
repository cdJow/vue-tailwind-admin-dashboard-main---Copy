<script setup lang="ts">
import { computed, ref } from 'vue';
import AddSuccessMessage from './AddSuccessMessage.vue';

// Inventory item structure
interface InventoryItem {
  id: string;
  name: string;
  quantityOnHand: number;
  salePrice: number;
  TotalAmount: number;
  costPerUnit: number;
}

// Sale record structure
interface SaleRecord {
  saleId: string;
  itemId: string;
  itemName: string;
  quantitySold: number;
  salePrice: number;
  saleDate: string;
  TotalAmount: number;
}

// Inventory data
const inventory = ref<InventoryItem[]>([
  {
    id: '1', name: 'Item A', quantityOnHand: 100, costPerUnit: 10,
    salePrice: 0,
    TotalAmount: 0
  },
  {
    id: '2', name: 'Item B', quantityOnHand: 50, costPerUnit: 20,
    salePrice: 0,
    TotalAmount: 0
  },
  

  
  // Add more items as needed
]);

// Sales records data
const salesRecords = ref<SaleRecord[]>([]);

// Form data for recording a sale
const saleForm = ref({
  itemId: '',
  itemName: '',
  quantitySold: 0,
  salePrice: 0,
  TotalAmount: 0,
  saleDate: new Date().toISOString().split('T')[0], // Default to today’s date
});

// Show or hide the modal
const showModal = ref(false);

// Show or hide the success message
const showSuccessMessage = ref(false);

function recordSale() {
  salesRecords.value.push({
    saleId: Math.random().toString(), // Generate a random sale ID
    itemId: saleForm.value.itemId,
    itemName: inventory.value.find(item => item.id === saleForm.value.itemId)!.name,
    quantitySold: saleForm.value.quantitySold,
    salePrice: saleForm.value.salePrice,
    saleDate: saleForm.value.saleDate, // Use the formatted date
    TotalAmount: 0
  });

  // Reset the sale form
  saleForm.value = {
    itemId: '',
    itemName: '',
    quantitySold: 0,
    salePrice: 0,
    TotalAmount: 0,
    saleDate: new Date().toLocaleDateString()
  };

  clearForm();

  // Close the modal
  showModal.value = false;

  // Show the success message
  showSuccessMessage.value = true;

  // Hide the success message after 3 seconds
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000);
}

// Clear the sale form
function clearForm() {
  saleForm.value = {
    itemId: '',
    itemName: '',
    quantitySold: 0,
    salePrice: 0,
    TotalAmount: 0,
    saleDate: new Date().toISOString().split('T')[0], // Reset to today’s date
  };
}


// Pagination variables
const currentPage = ref(1);
const rowsPerPage = 8;

// Calculate total pages
const totalPages = computed(() => Math.ceil(salesRecords.value.length / rowsPerPage));

// Paginated sales records based on the current page
const paginatedSalesRecords = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return salesRecords.value.slice(start, end);
});

// Navigate to the next page
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// Navigate to the previous page
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}


// Get the current date and time
const currentTime = ref(new Date());

// Update the current time every second
setInterval(() => {
  currentTime.value = new Date();
}, 1000);
</script>


<template>
  <AddSuccessMessage v-if="showSuccessMessage" />

  <div class="grid grid-cols-1 gap-4 md:grid-cols-10">


    <!-- Sale Form Modal -->
    <div class="col-span-1 md:col-span-3">
      <div class="bg-white rounded-lg shadow-lg">
        <h1 class="text-xl font-semibold bg-orange-500 text-white p-6 mb-2">Purchase Form</h1>
        <div class="pb-6 pl-6 pr-6">
          <form @submit.prevent="recordSale">
            <div v-for="(item, index) in saleForm.items" :key="index" class="mb-4 border-b pb-4">
              <label :for="'itemId-' + index" class="block mb-2">Item:</label>
              <select
                v-model="item.itemId"
                :id="'itemId-' + index"
                required
                class="w-full rounded-lg border text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary"
              >
                <option value="" disabled>Select an item</option>
                <option v-for="inventoryItem in inventory" :key="inventoryItem.id" :value="inventoryItem.id">
                  {{ inventoryItem.name }}
                </option>
              </select>
  
              <label :for="'quantitySold-' + index" class="block mt-4 mb-2">Quantity Sold:</label>
              <input
                type="number"
                v-model.number="item.quantitySold"
                :id="'quantitySold-' + index"
                required
                class="w-full rounded-lg border text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary"
                placeholder="Quantity"
              />
  
              <label :for="'salePrice-' + index" class="block mt-4 mb-2">Sale Price per Unit:</label>
              <input
                type="number"
                v-model.number="item.salePrice"
                :id="'salePrice-' + index"
                required
                class="w-full rounded-lg border text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary"
                placeholder="Sale Price"
              />
  
              <div class="flex justify-end mt-2">
                <button
                  type="button"
                  @click="removeItem(index)"
                  class="text-red-500 text-xs underline hover:text-red-700"
                >
                  Remove Item
                </button>
              </div>
            </div>
  
            <button
              type="button"
              @click="addItem"
              class="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 hover:bg-blue-600"
            >
              Add Another Item
            </button>
  
            <label class="block mt-4 border-t-2 border-slate-200 pt-2">Date: {{ currentTime.toLocaleString() }}</label>
  
            <div class="flex justify-end gap-2 mt-4">
              <button
                type="button"
                @click="clearForm"
                class="bg-red text-white rounded-full text-xs w-1/2 h-10 flex items-center justify-center hover:bg-white hover:text-red hover:border-red hover:border-2"
              >
                Clear
              </button>
              <button
                type="submit"
                class="bg-green-500 text-white rounded-full text-xs w-1/2 h-10 flex items-center justify-center hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    

    <!-- Sales Records Table -->
    <div class="col-span-1 md:col-span-7 w-full">
  <div class="bg-white rounded-lg shadow-md ">
    <div class="font-semibold bg-orange-500 w-full text-white p-5 mb-2">
          <div class="flex flex-col md:flex-row justify-between items-center ">
            <h2 class="text-2xl mb-2 md:mb-0">Sales Record</h2>

            <div class="flex items-center w-full md:w-90 sm:w-80">
              <!-- Search Input -->
              <input
                type="text"
                placeholder="Search..."
                class="w-full  sm:flex-1 mr-2 rounded-xl font-medium text-black bg-white py-1 px-4 border border-transparent outline-none transition focus:border-blue-500 active:border-blue-500"
              />
            
              <!-- Search Button -->
              <button
                type="submit"
                class="p-2 text-white bg-transparent rounded-lg border border-white hover:border-2 hover:border-white hover:bg-white hover:text-orange-500 "
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
                <span class="sr-only text-xs">Search</span>
              </button>
            </div>

           
          </div>
        </div>

        <div class="flex  justify-center items-center gap-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-slate-500 text-white rounded ">
            Previous
          </button>
          <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2  bg-slate-500 rounded  text-white">
            Next
          </button>
        </div>

        <div class="sales-records p-4 overflow-auto">
          <table class="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr class="bg-slate-100 text-slate-700">
                <th class="py-2 px-4 text-left font-medium">Sale ID</th>
                <th class="py-2 px-4 text-center font-medium">Items</th>
                <th class="py-2 px-4 text-center font-medium">Quantity Sold</th>
                <th class="py-2 px-4 text-center font-medium">Sale Price</th>
                <th class="py-2 px-4 text-center font-medium">Total Amount</th>
                <th class="py-2 px-4 text-center font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in paginatedSalesRecords" :key="record.saleId" class="hover:bg-slate-50 text-slate-800">
                <td class="py-2 px-4 text-left">{{ record.saleId }}</td>
                <td class="py-2 px-4 text-center">{{ record.itemName }}</td>
                <td class="py-2 px-4 text-center">{{ record.quantitySold }}</td>
                <td class="py-2 px-4 text-center">₱ {{ record.salePrice }}</td>
                <td class="py-2 px-4 text-center bg-green-500 border-white border-2 text-white">₱ {{ record.TotalAmount }}</td>
                <td class="py-2 px-4 text-center">{{ record.saleDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  cursor: grab; /* Add this property */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge, and Opera */
}
</style>
