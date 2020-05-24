import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from "./store";
import firebase from "./firebaseInit";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});
firebase.auth().onAuthStateChanged(function(user) {
  if (!user.emailVerified) {
    user.sendEmailVerification();
  }
});