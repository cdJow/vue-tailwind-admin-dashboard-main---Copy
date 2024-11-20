<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter
import axios from 'axios' // Import axios

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter() // Access the router instance

    // Form data
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const errorMessage = ref('') // Add an error message ref

    // Handle login form submission
    const handleLogin = async () => {
      // Check if passwords match
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match!'
        return
      }

      // Clear any previous error messages
      errorMessage.value = ''

      // Prepare form data
      const formData = {
        name: name.value,
        email: email.value,
        password: password.value,
      }

      try {
        // Send POST request to the Django backend
        const response = await axios.post('http://your-django-api-url.com/api/auth/login/', formData)

        // Handle successful login (redirect to eCommerce)
        if (response.status === 200) {
          router.push({ name: 'eCommerce' })
        }
      } catch (error) {
        console.error('Login failed:', error)
        errorMessage.value = 'Login failed. Please try again.'
      }
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      handleLogin,
      errorMessage
    }
  }
})
</script>

<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full sm:w-70 lg:w-1/4 xl:w-[1000px] mx-auto mt-10">
    <div class="flex flex-wrap items-center">
      <div class="w-full xl:block xl:w-1/2">
        <div class="py-9 px-6 text-center">
          <h1 class="text-3xl sm:text-4xl font-bold">WOODLAND SUITE</h1>
          <p class="font-medium sm:px-10 lg:px-20">
            Your Home Away From Home.
          </p>
          <span class="mt-9 inline-block">
            <img src="/src/assets/images/Logo.png" alt="illustration" class="w-48 sm:w-64 md:w-80 h-auto object-contain" />
          </span>
        </div>
      </div>

      <div class="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div class="w-full p-4 sm:p-2 xl:p-17.5">
          <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            LOG IN
          </h2>

          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium">Name</label>
              <input
                id="name"
                type="text"
                v-model="name"
                placeholder="Enter your full name"
                class="w-full p-2 border rounded-lg"
              />
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Enter your email"
                class="w-full p-2 border rounded-lg"
              />
            </div>

            <div class="mb-4">
              <label for="password" class="block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                class="w-full p-2 border rounded-lg"
              />
            </div>

            <div class="mb-4">
              <label for="confirmPassword" class="block text-sm font-medium">Re-type Password</label>
              <input
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                placeholder="Re-enter your password"
                class="w-full p-2 border rounded-lg"
              />
            </div>

            <!-- Display error message -->
            <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
              {{ errorMessage }}
            </div>

            <div class="mb-5 mt-6">
              <input
                type="submit"
                value="Create account"
                class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
              />
            </div>

            <div class="mt-6 text-center">
              <p class="font-medium">
                Already have an account?
                <router-link to="/auth/signin" class="text-primary">Sign in</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
