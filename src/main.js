import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'

const app = createApp(App)

// Set axios to be globally accessible
app.config.globalProperties.$axios = axios
app.use(router)

// Mount the app
app.mount('#app')
