import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Buefy from "buefy";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { auth } from "./config/firebaseConfig";

Vue.use(Buefy);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    console.log("redirect to login");
    next("/login");
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
