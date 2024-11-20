
<script>
export default {
  data() {
    return {
      bookings: [
        {
          roomNumber: "101",
          status: "Checked Out",
          checkInDate: "2024-11-15",
          checkOutDate: "2024-11-17",
          roomSize: "Double",
          floorNumber: "2",
          checkInTime: "2:00 PM",
          checkOutTime: "11:00 AM",
          guestName: "Jane Doe",
          amount: "988 PHP",
          status: "Paid",
          others: ["1 pc Shampoo", "2 pcs Blanket", "1 Extra Mattress"],
          total: "988 PHP",
        },
        // Add more booking data here
      ],
      isInvoiceModalOpen: false,
      selectedBookingInvoice: {},
    };
  },
  methods: {
    openInvoiceModal(booking) {
      this.selectedBookingInvoice = { ...booking };
      this.isInvoiceModalOpen = true;
    },
    closeInvoiceModal() {
      this.isInvoiceModalOpen = false;
      this.selectedBookingInvoice = {};
    },
  },
};
</script>

 <style scoped>
/* Apply transitions to the element */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-scale-enter-from, 
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
<template>  
  <div class="flex justify-center items-center mt-10">
 
    <div class="rounded-sm border border-stroke bg-white shadow-default w-full p-8">

      <!-- ====== Profile Details Start -->
      <div class="px-4 pb-6 flex flex-col items-center text-center lg:pb-8 xl:pb-11.5">
        <div class="relative -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div class="relative drop-shadow-2">
            <img src="@/assets/images/user/user-06.png" alt="profile" />
            <label
              for="profile"
              class="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <svg
                class="fill-current"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                  fill=""
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                  fill=""
                />
              </svg>
              <input type="file" name="profile" id="profile" class="sr-only" />
            </label>
          </div>
        </div>
        <h3 class="mb-1.5 mt-6 text-2xl font-medium text-black dark:text-white">
          Jane Marquee
        </h3>
        <div class="text-center mt-6 bg-slate-50 p-3 rounded-3xl w-3/4 lg:w-1/2">
          <p class="font-semibold text-slate-500 dark:text-white">
            Email: daniel@example.com
          </p>
          <p class="font-semibold text-slate-500 dark:text-white">
            Phone: +1234567890
          </p>
        </div>
      </div>
      
      <!-- ====== Profile Details End -->

<!-- Booking History -->
<div class="mt-6">
  <h4 class="text-xl font-semibold text-slate-800 dark:text-white">Booking History</h4>
  <div class="min-w-full overflow-x-auto mt-4">
    <div v-for="(booking, index) in bookings" :key="index">
      <div class="cursor-pointer bg-white border-[1px] border-slate-100 dark:bg-slate-800 rounded-md shadow-md p-4 mb-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Room Number: {{ booking.roomNumber }} | Status: {{ booking.status }}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400">{{ booking.checkInDate }} - {{ booking.checkOutDate }}</span>
          <button class="text-blue-500 hover:text-blue-700" @click="openInvoiceModal(booking)">
            View Invoice
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Invoice Popup Modal -->
<div v-if="isInvoiceModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999" @click.self="closeInvoiceModal">
  <div class="bg-white dark:bg-slate-800 rounded-lg w-96 p-6 shadow-lg">
    <h3 class="text-xl font-semibold text-slate-800 dark:text-white mb-4">Invoice Details</h3>
    <form @submit.prevent="submitInvoiceForm">
      <!-- Form Fields -->
      <div class="mb-4">
        <label for="guestName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Guest Name</label>
        <input id="guestName" v-model="selectedBookingInvoice.guestName" type="text" class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" disabled />
      </div>
      <!-- ... (Other Fields and Close Button) ... -->
    </form>
  </div>
</div>

<!-- Support Section -->
<div class="mt-6">
  <h4 class="text-xl font-semibold text-gray-800 dark:text-white">Need Help?</h4>
  <div class="mt-4">
    <a href="#" class="text-primary">Contact Support</a>
    <a href="#" class="ml-4 text-primary">FAQ</a>
  </div>
</div>
</div>
</div> <!-- Missing closing tag inserted here -->
</template>