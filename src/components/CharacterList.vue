<template>
    <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Valorant Characters</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="character in characters" :key="character.uuid" class="relative bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                <img :src="character.displayIcon" alt="Character Image" class="w-full h-64 object-contain bg-gray-200" />

                <div class="p-6 bg-gray-900 text-white">
                    <h2 class="text-2xl font-bold mb-2">{{ character.displayName }}</h2>
                    <p class="text-sm mb-2"
                        >Role:
                        <span class="font-semibold">{{ character.role?.displayName || 'Unknown' }}</span>
                    </p>
                    <p class="text-sm mb-4">{{ character.description ? character.description.substring(0, 100) + '...' : 'No description available' }}</p>

                    <button @click="showDetail(character.uuid)" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"> View Details </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const characters = ref([])
const router = useRouter()

const showDetail = (uuid) => {
    router.push(`/character/${uuid}`)
}

onMounted(async () => {
    const response = await axios.get('https://valorant-api.com/v1/agents')
    characters.value = response.data.data
})
</script>

<style scoped>
.container {
    padding: 1rem;
}
</style>
