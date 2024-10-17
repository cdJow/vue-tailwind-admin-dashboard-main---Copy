<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardGrid",
  components: {
    Card: defineComponent({
      name: "CardDisplay",
      props: {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
       
      },
      template: `
        <div class="bg-white shadow-lg rounded-md overflow-hidden">
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
            <p class="text-gray-700">{{ description }}</p>
          </div>
        </div>
      `,
    }),
  },
});
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card
      title="6 rooms"
      description="Total Available Rooms"
      class="p-4 text-xs text-green-600"
    />
    <Card
      title="19 Rooms"
      description="Total Occupied Rooms"
      class="p-4 text-xs text-red"
    />
    <Card
      title="4 Rooms"
      description="Total Booked Room as of Today"
      class="p-4 text-xs text-orange-500"
    />
    <Card
      title="60,000 Php"
      description="Total Sales as of today"
      class="p-4 text-xs text-blue-600"
    />
  </div>
</template>


