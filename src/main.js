import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { store } from "./store"
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';


import './assets/main.css'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 }
    }
})

const app = createApp(App)

app.use(VueSweetalert2)
app.use(router)
app.use(store)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";