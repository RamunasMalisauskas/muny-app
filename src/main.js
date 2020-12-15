import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./servises/firebase";
import "bulma/css/bulma.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
