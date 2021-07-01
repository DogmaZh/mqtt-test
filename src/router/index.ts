import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/Default.vue";
import HomeView from "@/views/Home.vue";
import DetailDeviceView from "@/views/DetailDevice.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        component: HomeView,
      },
      {
        path: "detail/:id",
        component: DetailDeviceView,
      },
      {
        path: "*",
        component: HomeView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
