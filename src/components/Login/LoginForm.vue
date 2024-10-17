<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');

    const handleLogin = () => {
      console.log('Logging in with', email.value, password.value);
      // Here, you can add authentication logic (e.g., calling an API).
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
});
</script>


<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  