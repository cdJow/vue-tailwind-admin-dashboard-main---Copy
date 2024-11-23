<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useRoute } from 'vue-router';
import DropdownAdmin from './DropdownAdmin.vue';

const target = ref(null)
const route = useRoute()


const sidebarStore = useSidebarStore()


onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})


const menuGroups = ref([
  {
    name: 'MENU',
    menuItems: [
      {
       icon: `<svg xmlns="http://www.w3.org/2000/svg" 
                      class="fill-current"
                   
                      fill="current" 
                      viewBox="0  0 30 30">">
                        <path d="m3,22h7v2H3c-1.654,0-3-1.346-3-3V2h5.171c.413-1.164,1.525-2,2.829-2h2c1.304,0,2.416.836,2.829,2h5.171v9h-2v-7h-5v-1c0-.551-.449-1-1-1h-2c-.551,0-1,.449-1,1v1H2v17c0,.552.449,1,1,1Zm3.165-13.131l-1.241-1.192-1.386,1.442,1.45,1.393c.326.326.754.488,1.181.488.425,0,.848-.161,1.168-.481l2.759-2.702-1.399-1.429-2.533,2.48Zm0,6l-1.241-1.192-1.386,1.441,1.449,1.393c.315.315.734.489,1.179.489s.865-.174,1.171-.48l2.759-2.702-1.399-1.429-2.533,2.481Zm17.835,1.131v8h-12v-8c0-1.654,1.346-3,3-3h6c1.654,0,3,1.346,3,3Zm-2,0c0-.552-.448-1-1-1h-6c-.552,0-1,.448-1,1v6h8v-6Zm-6,3h4v-2h-4v2Zm-2-10h-2.447l-2.042,2h4.489v-2Z"/>
                      </svg>

                      `,
        label: 'Inventory',
        route: '/Inventory/InventoryManagement'
      },
      {
        icon: `<svg
                    class="fill-current"
                 
                 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                    />
                  </svg>`,
        label: 'Dashboard',
        route: '/Dashboard/DashboardPanel',
      },

      {
        icon: `
       <svg fill="white"  viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg"><path d="M21,12.184V4a1,1,0,0,0-2,0V5H5V4A1,1,0,0,0,3,4v8.184A3,3,0,0,0,1,15v5a1,1,0,0,0,2,0V19H21v1a1,1,0,0,0,2,0V15A3,3,0,0,0,21,12.184ZM19,12H18V10a1,1,0,0,0-1-1H7a1,1,0,0,0-1,1v2H5V7H19ZM8,12V11h3v1Zm5-1h3v1H13ZM3,15a1,1,0,0,1,1-1H20a1,1,0,0,1,1,1v2H3Z"/></svg>
          `,
        label: 'Room',
        route: '/Room/RoomList'
      },

      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="white  "><path d="M760-400v-260L560-800 360-660v60h-80v-100l280-200 280 200v300h-80ZM560-800Zm20 160h40v-40h-40v40Zm-80 0h40v-40h-40v40Zm80 80h40v-40h-40v40Zm-80 0h40v-40h-40v40ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z"/></svg>`,
        label: 'Sales',
        route: '/Sales/SalesPanel'
      },

     

    ]
  },
])
</script>
<template>
  <header class="sticky top-0 z-100 flex w-full h-[70px] p-4 lg:fixed bg-gradient-to-r from-red to-orange-600">
    <nav class="flex w-full justify-between items-center">
      <div class="flex gap-2">
        <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <ul class="flex text-white items-center gap-6">
            <SidebarItem
              v-for="(menuItem, index) in menuGroup.menuItems"
              :key="index"
              :item="menuItem"
              :index="index"
              :active="route.path === menuItem.route"
            />
          </ul>
        </template>
      </div>

      <!-- Right-aligned DropdownUser -->
      <div class="flex items-center relative ">
        <DropdownAdmin />
      </div>
    </nav>
  </header>

  <main class="pt-1 lg:pt-20"></main>
</template>

<style scoped>
.hide-scrollbar {
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge, and Opera */
}
</style>
