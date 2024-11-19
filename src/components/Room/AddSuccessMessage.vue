<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Control visibility of the success message
const showSuccessMessage = ref<boolean>(true);
const slideOut = ref<boolean>(false);

// Function to hide the success message after 3 seconds
onMounted(() => {
  setTimeout(() => {
    slideOut.value = true; // Trigger slide-out animation
    setTimeout(() => {
      showSuccessMessage.value = false; // Hide message after animation
    }, 500); // Match this duration with slide-out animation duration
  }, 3000);
});
</script>

<template>
  <div 
    v-if="showSuccessMessage" 
    :class="['success-message', slideOut ? 'slide-out' : 'slide-in']"
  >
    <div class="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
          fill="white"
          stroke="white"
        ></path>
      </svg>
    </div>
    <div class="w-full">
      <h5 class="mb-3 text-lg font-bold text-black dark:text-[#34D399]">
        Room Added Successfully
      </h5>
    </div>
  </div>
</template>

<style scoped>
.success-message {
  position: fixed; /* Fixed position to stay in the viewport */
  bottom: 20px; /* Position from the bottom */
  right: 20px; /* Position from the right */
  width: 400px; /* Set width of the message */
  border-left: 6px solid #34D399;
  background-color: rgba(52, 211, 153, 0.15);
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Ensure it overlaps other elements */
}

.slide-in {
  animation: slideIn 0.5s forwards; /* Slide in animation */
}

.slide-out {
  animation: slideOut 0.5s forwards; /* Slide out animation */
}

@keyframes slideIn {
  from {
    transform: translateX(100%); /* Start off-screen to the right */
    opacity: 0; /* Start invisible */
  }
  to {
    transform: translateX(0); /* End at its position */
    opacity: 1; /* Fully visible */
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0); /* Start at its position */
    opacity: 1; /* Fully visible */
  }
  to {
    transform: translateX(100%); /* Slide out to the right */
    opacity: 0; /* Become invisible */
  }
}
</style>
