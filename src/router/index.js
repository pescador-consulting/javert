import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Exams from '../views/Exams.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import firebase from "./../firebaseInit";

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (requiresAuth && !currentUser.emailVerified) next('login');
  else if (!requiresAuth && currentUser) next('exams');
  else next();
});

export default router
