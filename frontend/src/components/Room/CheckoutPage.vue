<template>
    <div>
      <h1>Checkout</h1>
      
      <!-- Invoice Section -->
      <div class="invoice">
        <h2>Invoice</h2>
        <p><strong>Guest Name:</strong> {{ guestName }}</p>
        <p><strong>Room Type:</strong> {{ roomType }}</p>
        <p><strong>Room Rate:</strong> ${{ roomRate }}</p>
        <p><strong>Total Amount:</strong> ${{ totalAmount }}</p>
  
        <!-- Confirm Checkout Button -->
        <button @click="confirmCheckout">Confirm Checkout</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        guestName: 'John Doe',
        roomType: 'Deluxe Suite',
        roomRate: 150,
        totalAmount: 150
      };
    },
    methods: {
      confirmCheckout() {
        // Logic for confirming checkout
        console.log('Checkout confirmed for:', this.guestName);
        console.log('Room Type:', this.roomType);
        console.log('Total Amount:', this.totalAmount);
  
        // You can later replace this with an API call to confirm checkout
        this.displayConfirmationMessage();
      },
      displayConfirmationMessage() {
        alert('Checkout confirmed! Thank you for staying with us.');
      }
    }
  };
  </script>
  
  <style scoped>
  .invoice {
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    margin-bottom: 20px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  