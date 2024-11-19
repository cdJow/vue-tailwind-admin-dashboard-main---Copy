import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';

import SigninView from '@/views/Authentication/SigninView.vue';
import SignupView from '@/views/Authentication/SignupView.vue';
import CalendarView from '@/views/CalendarView.vue';
import BasicChartView from '@/views/Charts/BasicChartView.vue';
import ECommerceView from '@/views/Dashboard/ECommerceView.vue';
import FormElementsView from '@/views/Forms/FormElementsView.vue';
import FormLayoutView from '@/views/Forms/FormLayoutView.vue';
import SettingsView from '@/views/Pages/SettingsView.vue';
import ProfileView from '@/views/ProfileView.vue';
import TablesView from '@/views/TablesView.vue';
import AlertsView from '@/views/UiElements/AlertsView.vue';
import ButtonsView from '@/views/UiElements/ButtonsView.vue';
import LoginFormView from '@/views/LoginFormView.vue';
import InventoryManagementView from '@/views/InventoryManagementView.vue';
import AccountsMenuView from '@/views/AccountsMenuView.vue';
import RoomListView from '@/views/RoomListView.vue';
import SalesPanelView from '@/views/SalesPanelView.vue';
import WebAppView from '@/views/WebAppView.vue';
import AdminSettingsView from '@/views/Pages/AdminSettingsView.vue';


const routes = [

  {
    path: '/',
    name: 'Login',
    component: LoginFormView,
    meta: { title: 'Login' }
  },
  {
    path: '/Dashboard/DashboardPanel',
    name: 'eCommerce',
    component: ECommerceView,
    meta: { title: 'Woodland' }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: { title: 'Calendar' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { title: 'Profile' }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: { title: 'Form Elements' }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: { title: 'Form Layout' }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: { title: 'Tables' }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: { title: 'Settings' }
  },

  {
    path: '/pages/Adminsettings',
    name: 'Adminsettings',
    component: AdminSettingsView,
    meta: { title: 'Adminsettings' }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: { title: 'Basic Chart' }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: { title: 'Alerts' }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: { title: 'Buttons' }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: { title: 'Signin' }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: { title: 'Signup' }
  },

  {
    path: '/Inventory/InventoryManagement',
    name: 'Inventory',
    component: InventoryManagementView,
    meta: { title: 'Inventory' }
  },
  {
    path: '/Accounts/AccountsMenu',
    name: 'Accounts',
    component: AccountsMenuView,
    meta: { title: 'Accounts' }
  },
 

  {
    path: '/Room/RoomList',
    name: 'RoomList',
    component: RoomListView,  
    meta: { title: 'Room List' }
  },

  {
    path: '/Sales/SalesPanel',
    name: 'SalesPanel',
    component: SalesPanelView,
    meta: { title: 'Sales Panel' }
  },

  {
    path: '/WebsitePanel/WebApp',
    name: 'WebApp',
    component: WebAppView,
    meta: { title: 'Web App' }
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  }
});

router.beforeEach((to: RouteLocationNormalized, _from, next) => {
  // Check if the route has a title meta property
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next();
});

export default router;
