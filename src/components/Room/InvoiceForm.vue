<template>
  <div v-if="visible" class="invoice-modal">
    <h2>Invoice Details</h2>
    <p><strong>Full Name:</strong> {{ details.fullName }}</p>
    <p><strong>Room Number:</strong> {{ details.roomNumber }}</p>
    <p><strong>Check-in Time:</strong> {{ details.checkInTime }}</p>
    <p><strong>Check-out Time:</strong> {{ details.checkOutTime }}</p>
    <p><strong>Total Amount:</strong> {{ details.amount }}</p>
    <button @click="$emit('closeInvoice')">Close</button>
  </div>
</template>

<script>
export default {
  name: 'InvoiceForm',
  props: {
    details: Object,
    visible: Boolean
  }
};
</script>


