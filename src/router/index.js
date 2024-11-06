import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '../components/CharacterList.vue'
import CharacterDetail from '../components/CharacterDetail.vue'
import WeaponList from '../components/WeaponList.vue'
import WeaponDetail from '../components/WeaponDetail.vue'

const routes = [
    { path: '/', component: CharacterList },
    { path: '/character/:uuid', component: CharacterDetail, props: true },
    { path: '/weapons', component: WeaponList },
    { path: '/weapon/:uuid', component: WeaponDetail, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

export default router
