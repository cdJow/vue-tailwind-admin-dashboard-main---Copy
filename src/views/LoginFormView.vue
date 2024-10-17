<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import LoginForm from '@/components/Login/LoginForm.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Profile')
const titleClass = 'text-gradient text-4xl font-bold' // Add your desired Tailwind CSS classes here
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-242.5">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" :titleClass="titleClass" />
      <!-- Breadcrumb End -->
      <LoginForm/>
    </div>
  </DefaultLayout>
</template>

