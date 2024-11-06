<template>
    <nav class="bg-gray-800 sticky top-0 z-50 container py-4 px-4 md:px-10 lg:px-20 xl:px-24">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-2xl font-bold">
                <router-link to="/" class="hover:text-gray-400">Valorant App</router-link>
            </div>
            <div class="hidden md:flex space-x-4">
                <router-link to="/" class="text-white hover:text-gray-400" :class="{ 'border-b-2 border-blue-500': route.path === '/' }"> Characters </router-link>
                <router-link to="/weapons" class="text-white hover:text-gray-400" :class="{ 'border-b-2 border-blue-500': route.path === '/weapons' }"> Weapons </router-link>
            </div>
            <div class="md:hidden flex items-center">
                <button @click="toggleMenu" class="text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="menuOpen" class="md:hidden mt-4 space-y-2">
            <router-link to="/" class="block text-white text-center py-2 bg-gray-700 hover:bg-gray-600" :class="{ 'bg-blue-500': route.path === '/' }"> Characters </router-link>
            <router-link to="/weapons" class="block text-white text-center py-2 bg-gray-700 hover:bg-gray-600" :class="{ 'bg-blue-500': route.path === '/weapons' }"> Weapons </router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
nav {
    background-color: #1a1a1a;
}
</style>
