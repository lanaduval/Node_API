import './assets/main.css'

import AppLayout from './AppLayout.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from "naive-ui";
import 'intersection-observer';  //polyfill for infinite scroll

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(naive);

app.mount('#app')
app.component('AppLayout', AppLayout);
