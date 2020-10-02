import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Columns from "../views/Columns";
import Info from "../views/Info";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/info",
    name: "Info",
    component: Info
  },
  {
    path: "/columns/:id",
    name: "Columns",
    component: Columns
  }
];

const router = new VueRouter({
  routes
});

export default router;
