<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import AddSuccessMessage from './AddSuccessMessage.vue';



interface InventoryItem {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default defineComponent({
  name: 'PurchaseForm',
  components: {
    AddSuccessMessage, // Register the component
  },
  setup() {
  const inventory = ref<InventoryItem[]>([
    { id: 1, name: 'Risus Fringilla', price: 35.0 },
    { id: 2, name: 'Commodo Fusce', price: 35.0 },
    { id: 3, name: 'Lorem Pharetra', price: 35.0 },
    // Add more items here as per your inventory
  ]);

  const showSuccessMessage = ref(false);
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(10);  // Number of items per page
  const totalItems = ref<number>(100);   // Total number of items (can be fetched from an API)

  // Computed property for the total number of pages
  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / itemsPerPage.value);
  });

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const items = ref<CartItem[]>([]);
  const discount = ref<number>(0);
  const selectedInventoryItem = ref<number | null>(null);

  // Add selected inventory item to the list
  const addItemToList = () => {
    if (selectedInventoryItem.value) {
      const inventoryItem = inventory.value.find(item => item.id === selectedInventoryItem.value);
      if (inventoryItem) {
        items.value.push({
          id: inventoryItem.id,
          name: inventoryItem.name,
          price: inventoryItem.price,
          quantity: 1, // Default quantity
        });
      }
    }
    selectedInventoryItem.value = null; // Reset selection
  };

  // Remove Item from Cart
  const removeItem = (index: number) => {
    items.value.splice(index, 1);
  };

  // Update Item Quantity
  const updateQuantity = (index: number, change: number) => {
    const newQuantity = items.value[index].quantity + change;
    if (newQuantity >= 1) {
      items.value[index].quantity = newQuantity;
    }
  };

  // Subtotal calculation
  const subTotal = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  // Tax calculation (1.5% of Subtotal)
  const tax = computed(() => {
    return subTotal.value * 0.015;
  });

  // Total calculation (after discount and tax)
  const total = computed(() => {
    const discountAmount = (subTotal.value * discount.value) / 100;
    return subTotal.value - discountAmount + tax.value;
  });

  // Sales records data (paginated records)
  const salesRecords = ref<any[]>([]);

  const formRef = ref<HTMLElement | null>(null); // Type `formRef` as HTMLElement

  const confirmPayment = () => {
  alert('Payment Confirmed');
  showSuccessMessage.value = true;

  // Create a new sale record with detailed product breakdown
  const newSale = {
    saleId: salesRecords.value.length + 1,
    items: items.value.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: (item.price * item.quantity).toFixed(2),
    })),
    totalAmount: total.value.toFixed(2),
    saleDate: new Date().toLocaleDateString(),
  };

  // Reset form and reactive data
  if (formRef.value && formRef.value instanceof HTMLFormElement) {
    formRef.value.reset();
  }
  items.value = [];
  discount.value = 0;
  selectedInventoryItem.value = null;

  salesRecords.value.unshift(newSale);

  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000);
};



const record = ref({
      saleDate: '',
      totalAmount: 0,
      items: []
    })

  // Paginated sales records
  const paginatedSalesRecords = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    return salesRecords.value.slice(startIndex, startIndex + itemsPerPage.value);
  });

  return {
    inventory,
    items,
    discount,
    selectedInventoryItem,
    subTotal,
    tax,
    total,
    addItemToList,
    removeItem,
    updateQuantity,
    confirmPayment,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    showSuccessMessage,
    salesRecords,
    paginatedSalesRecords,
    formRef,
    record,
  };
}

});
</script>

<style scoped>
/* Add custom styles if needed */
</style>

<template>
  <AddSuccessMessage v-if="showSuccessMessage" />

  <div class="grid grid-cols-1 gap-4 md:grid-cols-10">


    <!-- Sale Form Modal -->
   <div class="col-span-1 md:col-span-3">
    <div class="bg-white rounded-lg shadow-lg">
      <h1 class="text-xl font-semibold bg-orange-500 text-white p-6 mb-2">Purchase Form</h1>

      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <!-- Item List -->
        <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="grid grid-cols-4 items-center justify-between gap-4 mb-4 border-b border-slate-200 pb-4"
      >
        <!-- Item Name -->
        <div class="col-span-1">
          <span class="font-xs break-words whitespace-normal">{{ item.name }}</span>
        </div>
      
    
        <div class="col-span-1 flex justify-center">
          <button @click="removeItem(index)" class="text-red text-sm hover:text-red">
            <i class="fa fa-trash-alt">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px" fill="red">
                <path
                  d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z" 
                />
              </svg>
            </i>
          </button>
        </div>
      
        
        <div class="col-span-1 flex items-center space-x-4 justify-center">
          <button @click="updateQuantity(index, -1)" class="text-sm text-slate-600 hover:text-slate-800">
            -
          </button>
          <span class="text-lg">{{ item.quantity }}</span>
          <button @click="updateQuantity(index, 1)" class="text-sm text-slate-600 hover:text-slate-800">
            +
          </button>
        </div>
      
        <!-- Total Price -->
        <div class="col-span-1 text-right">
          <span class="font-xs">${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
      
        <!-- Add New Item from Inventory -->
        <div class="mb-4 flex items-center space-x-4">

          <select
            id="addItem"
            v-model="selectedInventoryItem"
            class="w-full rounded-lg py-2 px-4 border border-slate-300 focus:outline-none"
            :disabled="!inventory.length"
          >
            <option value="" disabled>Select an item</option>
            <option v-for="item in inventory" :key="item.id" :value="item.id">
              {{ item.name }} -  ₱{{ item.price }}
            </option>
          </select>
          <button
          @click="addItemToList"
          :disabled="!selectedInventoryItem"
          class="bg-blue-500 text-xs text-white py-2 px-5 rounded-lg hover:bg-blue-600 whitespace-nowrap"
        >
          Add Item
        </button>
        
        </div>

        <!-- Discount Section -->
        <div class="flex justify-between items-center mt-4 border-t pt-4">
          <label for="discount" class="text-gray-700">Discount (%)</label>
          <input
            type="number"
            id="discount"
            v-model.number="discount"
            class="w-1/2 rounded-lg py-2 px-4 border border-gray-300 focus:outline-none"
            placeholder="Enter discount"
            min="0"
            max="100"
          />
        </div>

        <!-- Sub Total, Tax, Total -->
        <div class="mt-4">
          <div class="flex justify-between">
            <span class="font-semibold">Sub Total</span>
            <span class="font-semibold"> ₱{{ subTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Tax 1.5%</span>
            <span class="font-semibold"> ₱{{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mt-4 border-t pt-2">
            <span class="font-semibold text-lg">Total</span>
            <span class="font-semibold text-lg"> ₱{{ total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Pay Button -->
        <div class="mt-6 flex justify-center">
          <button
            @click="confirmPayment"
            class="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-600"
          >
            Pay ( ₱{{ total.toFixed(2) }})
          </button>
        </div>
      </div>
    </div>
  </div>

    <!-- Sales Records Table -->
    <div class="col-span-1 md:col-span-7 w-full ">
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

        <div class="sales-records p-4 ">
          <table class="min-w-full bg-white rounded-lg shadow-sm overflow-auto">
            <thead>
              <tr class="bg-slate-100 text-slate-700">
                <th class="py-2 px-4 text-left font-medium">Sale ID</th>
                <th class="py-2 px-4 text-center font-medium">Items</th>
                <th class="py-2 px-4 text-center font-medium">Quantity Sold</th>
                <th class="py-2 px-4 text-center font-medium">Sale Price</th>
                <th class="py-2 px-4 text-center font-medium"> Amount</th>
                <th class="py-2 px-4 text-center font-medium">Total Amount</th>
                <th class="py-2 px-4 text-center font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(record, recordIndex) in paginatedSalesRecords"
                :key="record.saleId"
                class="hover:bg-slate-50 text-slate-800 border-b border-slate-300"
              >
                <td class="py-2 px-4 text-left align-top">{{ record.saleId }}</td>
                <td class="py-2 px-4 text-left align-top">
                  <ul>
                    <li
                      v-for="(item, itemIndex) in record.items"
                      :key="`${recordIndex}-${itemIndex}`"
                      class="text-left"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </td>
                <td class="py-2 px-4 text-center align-top">
                  <ul>
                    <li
                      v-for="(item, itemIndex) in record.items"
                      :key="`${recordIndex}-${itemIndex}`"
                      class="text-center"
                    >
                      {{ item.quantity }}
                    </li>
                  </ul>
                </td>
                <td class="py-2 px-4 text-center align-top">
                  <ul>
                    <li
                      v-for="(item, itemIndex) in record.items"
                      :key="`${recordIndex}-${itemIndex}`"
                      class="text-center"
                    >
                      ₱ {{ item.price.toFixed(2) }}
                    </li>
                  </ul>
                </td>
                <td class="py-2 px-4 text-center align-top">
                  <ul>
                    <li
                      v-for="(item, itemIndex) in record.items"
                      :key="`${recordIndex}-${itemIndex}`"
                      class="text-center"
                    >
                      ₱ {{ item.total }}
                    </li>
                  </ul>
                </td>
                <td class="py-2 px-4 text-center text-green-800 font-bold bg-green-100">
                 ₱ {{ record.totalAmount }}
                </td>
                <td class="py-2 px-4 text-center">
                  {{ record.saleDate }}
                </td>
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
