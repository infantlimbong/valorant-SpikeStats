<template>
    <div class="container mx-auto mt-8">
        <div v-if="character" class="flex flex-col items-center">
            <img :src="character.bustPortrait" alt="Character Image" class="w-64 h-64 object-cover" />
            <h1 class="text-4xl font-bold mt-4">{{ character.displayName }}</h1>
            <p class="text-lg text-gray-500 text-center mt-4 max-w-xl">{{ character.description }}</p>

            <div class="bg-gray-100 p-4 mt-6 rounded-lg shadow-lg flex items-center">
                <img :src="character.role.displayIcon" alt="Role Icon" class="w-12 h-12 mr-4" />
                <div>
                    <h2 class="text-xl font-bold">{{ character.role.displayName }}</h2>
                    <p class="text-gray-600">{{ character.role.description }}</p>
                </div>
            </div>

            <div class="w-full max-w-4xl mt-8">
                <h2 class="text-2xl font-bold text-center">Abilities</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    <div v-for="ability in character.abilities" :key="ability.slot" class="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                        <img :src="ability.displayIcon" :alt="ability.displayName" class="w-12 h-12 mb-4 mx-auto" />
                        <h3 class="text-lg font-bold text-center">{{ ability.displayName }}</h3>
                        <p class="text-sm text-gray-300 mt-2">{{ ability.description }}</p>
                    </div>
                </div>
            </div>

            <div class="w-full max-w-4xl mt-8">
                <h2 class="text-2xl font-bold text-center">Full Portrait</h2>
                <img :src="character.fullPortrait" alt="Full Portrait" class="w-full mt-4 rounded-lg shadow-md" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const character = ref(null)

onMounted(async () => {
    const { uuid } = route.params
    const response = await axios.get(`https://valorant-api.com/v1/agents/${uuid}`)
    character.value = response.data.data
})
</script>

<style scoped>
.container {
    padding: 1rem;
}
</style>
