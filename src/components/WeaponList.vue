<template>
    <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Valorant Weapons</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="weapon in weapons" :key="weapon.uuid" class="relative bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                <img :src="weapon.displayIcon" alt="Weapon Image" class="w-full h-64 object-contain bg-gray-200 p-4" />

                <div class="p-6 bg-gray-900 text-white">
                    <h2 class="text-2xl font-bold mb-2">{{ weapon.displayName }}</h2>
                    <p class="text-sm mb-2"
                        >Category:
                        <span class="font-semibold">
                            {{ weapon.shopData?.categoryText || 'Unknown' }}
                        </span>
                    </p>
                    <p class="text-sm mb-4"
                        >Cost:
                        <span class="font-semibold">
                            {{ weapon.shopData?.cost ? weapon.shopData.cost + ' credits' : 'Not Available' }}
                        </span>
                    </p>

                    <button @click="showDetail(weapon.uuid)" class="z-0 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"> View Details </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const weapons = ref([])
const router = useRouter()

const showDetail = (uuid) => {
    router.push(`/weapon/${uuid}`)
}

onMounted(async () => {
    const response = await axios.get('https://valorant-api.com/v1/weapons')
    weapons.value = response.data.data
})
</script>

<style scoped>
.container {
    padding: 1rem;
}
</style>
