import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Columns from "../views/Columns";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/columns",
    name: "Columns",
    component: Columns
  },
];

const router = new VueRouter({
  routes
});

export default router;
