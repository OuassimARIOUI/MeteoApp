import { createRouter, createWebHistory } from 'vue-router'
import WeatherFirstPage from '../components/WeatherFirstPage.vue'
import WeatherApp from '../components/WeatherApp.vue'

const routes = [
    { path: '/', component: WeatherFirstPage },
    { path: '/weather', component: WeatherApp },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
