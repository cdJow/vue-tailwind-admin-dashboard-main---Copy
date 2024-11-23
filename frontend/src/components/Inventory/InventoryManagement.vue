<script setup lang="ts">
import { computed, ref } from 'vue';
import AlertSuccess from '../Alerts/AlertSuccess.vue';

// Types for packages and new products
interface Package {
  id: string;
  name: string;
  description: string;
  category: string;
  UnitofMeasurement: string;
  QuantityonHand: string;
  SupplierName: string;
  CostperPack: string;
  srp: string;
  ArrivalDate: string;
  ExpirationDate: string;
  SerialNumber: string;
  brand: string;
  batchNumber: string;
  Minstock: string;
  reorder: string;
  editedDate: string;
}

// Modal visibility state
const showModal = ref<boolean>(false);
const showSuccessMessage = ref<boolean>(false); // Controls the success message visibility

const packages = ref<Package[]>([]);

// Data for the form (new product)
const newProduct = ref<Package>({
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
  SerialNumber: '',
  brand: '',
  batchNumber: '',
  Minstock: '',
  reorder: '',
  editedDate: ''
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
    SerialNumber: '',
    brand: '',
    batchNumber: '',
    Minstock: '',
    reorder: '',
    editedDate: ''
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

// Function to submit a new product
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
    newProduct.value.srp &&
    newProduct.value.SerialNumber &&
    newProduct.value.brand &&
    newProduct.value.batchNumber &&
    newProduct.value.Minstock &&
    newProduct.value.reorder 
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

const selectedItem = ref<Package | null>(null)
const showEditModal = ref<boolean>(false);
  const closeEditModal = () => {
  showEditModal.value = false;
};
// Function to open the modal for editing a product
const openEditModal = (item: Package) => {
  selectedItem.value = { ...item }; // Copy the item data to edit
  showEditModal.value = true; // Show the edit modal
};

// Function to save changes made in the edit modal
const saveChanges = () => {
  if (selectedItem.value) {
    const index = packages.value.findIndex(pkg => pkg.id === selectedItem.value!.id);
    if (index !== -1) {
      packages.value[index] = { ...selectedItem.value, editedDate: new Date().toLocaleString() };
    }
    closeEditModal();
  }
};

// Pagination variables
const currentPage = ref(1);
const rowsPerPage = 6;

// Calculate total pages
const totalPages = computed(() => Math.ceil(packages.value.length / rowsPerPage));

// Paginated sales records based on the current page
const paginatedSalesRecords = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return packages.value.slice(start, end);
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




// Declare the search query
const searchQuery = ref('');

</script>
<template>
  <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4  ">
    <button
  @click="openModal"
  class="w-full sm:w-auto rounded-lg border-[1.5008px] text-white border-stroke bg-blue-400 py-3 px-5 font-normal outline-none shadow-sm text-base sm:text-lg md:text-xl"
>
  Add New Product
</button>


    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="w-full sm:w-auto rounded-lg border-[1.5008px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none shadow-sm"
    />

    <div class="w-full sm:w-auto shadow-sm"
    >
      <select   class="w-full sm:w-auto rounded-lg border-[1.5008px] text-black border-stroke bg-white py-3 px-5 font-normal outline-none"
      > 
      <option value="" disabled>Select Category</option>
        <option value="All">All</option>
        <option value="Consumable">Consumable</option>
        <option value="Non-Consumables">Non-Consumable</option>
       
      </select>
    </div>


  <!-- Pagination Controls -->
  <div class="flex justify-end  gap-6  items-center mt-4">
    <div >
    </div> <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2  bg-blue-500 rounded text-white ">
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="px-7 py-2   bg-blue-500 rounded text-white">
      Next
    </button>
    <div>
    </div>
  </div>
  </div>

  

  <!-- Success Message -->
  <AlertSuccess v-if="showSuccessMessage" />

  <!-- Add New Product Modal -->
<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg shadow-lg w-full sm:w-11/12 md:w-9/12 lg:w-3/4 xl:w-[1200px] ">
    <h2 class="bg-gradient-to-r from-red to-orange-600 text-white font-bold text-2xl rounded-t-lg p-5 mb-6">
      Add New Product
    </h2>
    <div class="p-5">
      <form @submit.prevent="submitProduct">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-[400px] w-full overflow-auto ">
          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Serial Number</label>
              <input
                v-model="newProduct.SerialNumber"
                type="text"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Serial Number"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Brand</label>
              <input
                v-model="newProduct.brand"
                type="text"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Brand"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Product Name</label>
              <input
                v-model="newProduct.name"
                type="text"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Product Name"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Description</label>
              <input
                v-model="newProduct.description"
                type="text"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Description"
                required
              />
            </div>
          </div>
  
          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Supplier Name</label>
              <input
                v-model="newProduct.SupplierName"
                type="text"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Supplier Name"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Unit of Measurement</label>
              <input
                v-model="newProduct.UnitofMeasurement"
                type="text"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Unit of Measurement"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Quantity on Hand</label>
              <input
                v-model="newProduct.QuantityonHand"
                type="number"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Quantity on Hand"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Batch Number</label>
              <input
                v-model="newProduct.batchNumber"
                type="number"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Batch Number"
                required
              />
            </div>
          </div>
  
          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Cost per Pack</label>
              <input
                v-model="newProduct.CostperPack"
                type="number"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Cost per Pack"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">SRP</label>
              <input
                v-model="newProduct.srp"
                type="number"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="SRP"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Minimum Stock Level</label>
              <input
                v-model="newProduct.Minstock"
                type="number"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Minimum Stock Level"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Reorder Quantity</label>
              <input
                v-model="newProduct.reorder"
                type="number"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Reorder Quantity"
                required
              />
            </div>
          </div>
  
          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Category</label>
              <select
                v-model="newProduct.category"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="Consumable">Consumable</option>
                <option value="Non-Consumable">Non-Consumable</option>
              </select>
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Arrival Date</label>
              <input
                v-model="newProduct.ArrivalDate"
                type="date"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
              />
            </div>
  
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Expiration Date</label>
              <input
                v-model="newProduct.ExpirationDate"
                type="date"
                class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
              />
            </div>
          </div>
        </div>
  
        <div class="flex justify-center sm:justify-end space-x-4 mt-6 pb-5 pl-9 pr-9">
          <button type="button" @click="closeModal" class="bg-red text-white mr-4 px-6 py-2 rounded-lg hover:bg-white hover:text-red">
            Cancel
          </button>
          <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded-xl">Submit</button>
        </div>
        
      </form>
    </div>
  </div>
</div>




  <div v-if="showEditModal && selectedItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white  rounded-lg shadow-lg  w-full">
      
      <h2 class=" bg-blue-500 text-white font-bold  text-2xl rounded-t-lg p-9 mb-6">Edit Product</h2>
        <div class=" pb-5 pl-9 pr-9 grid grid-cols-4 gap-6">
          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Serial Number</label>
              <input v-model="selectedItem.SerialNumber" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Serial Number"
              required>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Brand</label>
              <input v-model="selectedItem.brand" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Serial Number"
              required>
            </div>

            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Product Name</label>
              <input v-model="selectedItem.name" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Product Name"
              required>
            </div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Description</label>
              <input v-model="selectedItem.description" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Description"
              required></div>
            
          </div>

          <div>
            
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Supplier Name</label>
              <input v-model="selectedItem.SupplierName" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Supplier Name"
              required></div>
              <div class="mb-4">
                <label class="block mb-2 font-semibold text-sm">Unit of Measurement</label>
                <input v-model="selectedItem.UnitofMeasurement" type="text"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Unit of Measurement"
                required></div>
              <div class="mb-4">
                <label class="block mb-2 font-semibold text-sm">Quantity on Hand</label>
                <input v-model="selectedItem.QuantityonHand" type="number" class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Quantity on Hand"
                required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Batch Number</label>
              <input v-model="selectedItem.batchNumber" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Cost Per Pack"
              required></div>
          </div>

          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Cost per Pack</label>
              <input v-model="selectedItem.CostperPack" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Cost Per Pack"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">SRP</label>
              <input v-model="selectedItem.srp" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="SRP"
              required></div>

              <div class="mb-4">
                <label class="block mb-2 font-semibold text-sm">Minimum Stock Level</label>
                <input v-model="selectedItem.Minstock" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Minimum Stock Level"
                required></div>
                <div class="mb-4">
                  <label class="block mb-2 font-semibold text-sm">Reorder Quantity</label>
                  <input v-model="selectedItem.reorder" type="number"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="Reorder Quantity"
                  required></div>
          </div>

          <div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Category</label>
              <select v-model="selectedItem.category"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
              required> 
              <option value="" disabled>Select Category</option>
                <option value="Consumable">Consumable</option>
                <option value="Non-Consumable">Non-Consumable</option>
               
              </select>
            </div>
           
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Arrival Date</label>
              <input v-model="selectedItem.ArrivalDate" type="date"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required></div>
            <div class="mb-4">
              <label class="block mb-2 font-semibold text-sm">Expiration Date</label>
              <input v-model="selectedItem.ExpirationDate" type="date"  class="w-full rounded-lg border-[1.5008px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              required></div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6 pb-5 pl-9 pr-9">
          <button type="button" @click="showEditModal = false" class="bg-red text-white  mr-4 px-6 py-2 rounded-lg hover:bg-white hover:text-red">Cancel</button>
          <button type="submit" @click="saveChanges" class="px-6 py-3 bg-blue-500 text-white rounded-xl">Save</button>
        </div>

    </div>
  </div>



 

  <!-- Product Table -->
  <div class="rounded-lg border border-stroke bg-white pt-1 pb-2.5 shadow-default ">
    <div class="max-w-full overflow-x-auto scrollbar">
      <table class="w-full table-auto min-w-[800px]">
        <thead>
          <tr class="bg-slate-200 text-left dark:bg-meta-4">
            <th class="min-w-[100px] py-2 px-2 font-medium text-xs"> ID</th>
            <th class="min-w-[100px] py-2 px-2 font-medium text-xs ">Serial Number</th>
            <th class="min-w-[60px] py-2 px-2  font-medium text-xs">Brand</th>
            <th class="min-w-[100px] py-2 px-2  font-medium text-xs">Product Name</th>
            <th class="min-w-[100px] py-2 px-2  font-medium text-xs">Description</th>
            <th class="min-w-[100px] py-2 px-2  font-medium text-xs">SupplierName</th>
            <th class="min-w-[100px] py-2 px-2  font-medium text-xs">Unit of Measurement</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Quantity on Hand</th>
            <th class="min-w-[100px] py-4  font-medium text-xs">Batch Number</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Cost Per Pack</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">SRP</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Min. Stock</th>
            <th class="min-w-[10px] py-4 px-4 font-medium text-xs">Reorder Quantity</th>
            <th class="min-w-[90px] py-4  font-medium text-xs">Total Value</th><!--The Total Value field represents the total monetary worth of a specific product in inventory. It’s calculated as:-->
            <th class="min-w-[90px] py-4  font-medium text-xs">Category</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Arrival Date</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Expiration Date</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Edited Date</th>
            <th class="min-w-[100px] py-4 px-4 font-medium text-xs">Action</th>
        
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedSalesRecords" :key="item.id">
            <td class="py-2 px-4 text-xs ">{{ item.id }}</td>
            <td class="py-2 px-4 text-xs">{{ item.SerialNumber }}</td>
            <td class="py-2 px-4 text-xs">{{ item.brand }}</td>
            <td class="py-2 px-4 text-xs">{{ item.name }}</td>
            <td class="py-2 px-4 text-xs">{{ item.description }}</td>
            <td class="py-2 px-4 text-xs">{{ item.SupplierName }}</td>
            <td class="py-2 px-4 text-xs">{{ item.UnitofMeasurement }}</td>
            <td class="py-2 px-4 text-xs">{{ item.QuantityonHand}}</td>
            <td class="py-2 px-4 text-xs">{{ item.batchNumber }}</td>
            <td class="py-2 px-4 text-xs  bg-green-700 text-white border-white border-2">₱ {{ item.CostperPack }}</td>
            <td class="py-2 px-4 text-xs bg-green-500 text-white  border-white border-2">₱ {{ item.srp }}</td>
            <td class="py-2 px-4 text-xs ">{{ item.Minstock }}</td>
            <td class="py-2 px-4 text-xs ">{{ item.reorder }}</td>
            <td class="py-2 px-4 text-xs bg-blue-400 text-white  border-white border-2">{{ item.TotalValue }}</td>
            <td 
            :class="{
              'bg-yellow-500': item.category === 'Consumable',
              'bg-orange-500': item.category === 'Non-Consumable',
              'text-black': item.category === 'Non-Consumable'
            }"
            class="py-2 px-4 text-xs text-white  border-white border-2"
          >
            {{ item.category }}
          </td>
            <td class="py-5 px-4 text-xs ">{{ item.ArrivalDate }}</td>
            <td class="py-5 px-4 text-xs bg-red text-white  border-white border-2">{{ item.ExpirationDate }}</td>
            <td class="py-5 px-4 text-xs ">{{item.editedDate}}</td>
            <td class="py-5 px-4 text-xs">
              <button
                @click="openEditModal(item)"
             class="bg-green-500 text-white rounded-full text-xs w-full h-6 flex items-center justify-center hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2"
              >
                Edit
              </button>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  

</template>

<style scoped>
.scrollbar {
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab; /* Adds the grab cursor */
}

/* For Chrome, Edge, Safari */
.scrollbar::-webkit-scrollbar {
  height: 8px; /* Height of the horizontal scrollbar */
  background-color: #f0f0f0; /* Scrollbar track background */
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar thumb */
  border-radius: 6px; /* Round edges for the thumb */
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #b1b1b1; /* Change color on hover */
}

.scrollbar::-webkit-scrollbar-track {
  background-color: #e0e0e0; /* Track color */
}

/* For Firefox */
.scrollbar {
  scrollbar-width: thin; /* Thin scrollbar */
  scrollbar-color: #888 #f0f0f0; /* Thumb and track colors */
}

</style>

