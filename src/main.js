import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import firebase from "firebase/app";
import VueMq from "vue-mq";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyAu36cu6UWFg7l-4XBnfgj3cOQ-ydeTRis",
  authDomain: "what-to-eat-fe48a.firebaseapp.com",
  projectId: "what-to-eat-fe48a",
  databaseURL: "https://what-to-eat-fe48a-default-rtdb.firebaseio.com/",
  storageBucket: "what-to-eat-fe48a.appspot.com",
  messagingSenderId: "199142113995",
  appId: "1:199142113995:web:d2c58faa700ea30be0914e",
  hosting: {
    public: "dist",
    rewrites: [
      {
        source: "**",
        destination: "/index.html",
      },
    ],
  },
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
