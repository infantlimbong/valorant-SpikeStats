<template>
    <div class="container mx-auto py-8">
        <div v-if="weapon" class="flex flex-col items-center">
            <img :src="weapon.displayIcon" alt="Weapon Image" class="w-64 h-64 object-contain" />
            <h1 class="text-4xl font-bold mt-6 text-gray-800">{{ weapon.displayName }}</h1>
            <p class="text-lg text-gray-500 mb-4">Category: {{ weapon.shopData?.categoryText || 'Unknown' }}</p>

            <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6">
                <h2 class="text-3xl font-bold mb-4">Weapon Stats</h2>
                <ul class="grid grid-cols-2 gap-6">
                    <li><strong>Fire Rate:</strong> {{ weapon.weaponStats?.fireRate || 'N/A' }} rounds/sec</li>
                    <li><strong>Magazine Size:</strong> {{ weapon.weaponStats?.magazineSize || 'N/A' }} rounds</li>
                    <li><strong>Reload Time:</strong> {{ weapon.weaponStats?.reloadTimeSeconds || 'N/A' }} sec</li>
                    <li><strong>Wall Penetration:</strong> {{ formatWallPenetration(weapon.weaponStats?.wallPenetration) || 'Unknown' }}</li>
                    <li v-if="weapon.weaponStats?.adsStats"><strong>ADS Zoom:</strong> {{ weapon.weaponStats.adsStats.zoomMultiplier }}x</li>
                    <li v-if="weapon.weaponStats?.adsStats"><strong>ADS Fire Rate:</strong> {{ weapon.weaponStats.adsStats.fireRate }} rounds/sec</li>
                    <li v-if="weapon.weaponStats?.adsStats"><strong>ADS First Bullet Accuracy:</strong> {{ weapon.weaponStats.adsStats.firstBulletAccuracy }}</li>
                </ul>
            </div>

            <div class="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6">
                <h2 class="text-3xl font-bold mb-4">Damage Ranges</h2>
                <table class="w-full text-left table-auto">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="p-4">Range (meters)</th>
                            <th class="p-4">Head Damage</th>
                            <th class="p-4">Body Damage</th>
                            <th class="p-4">Leg Damage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="range in weapon.weaponStats?.damageRanges || []" :key="range.rangeStartMeters">
                            <td class="p-4">{{ range.rangeStartMeters }} - {{ range.rangeEndMeters }}</td>
                            <td class="p-4">{{ range.headDamage }}</td>
                            <td class="p-4">{{ range.bodyDamage }}</td>
                            <td class="p-4">{{ range.legDamage }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="weapon.skins.length" class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6">
                <h2 class="text-3xl font-bold mb-4">Available Skins</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="skin in weapon.skins" :key="skin.uuid" class="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
                        <img v-if="skin.displayIcon" :src="skin.displayIcon" :alt="skin.displayName" class="w-full h-48 object-contain bg-gray-200 p-4" />
                        <div v-else class="w-full h-48 grid place-items-center bg-gray-200">Image is not available</div>
                        <div class="p-4 text-center">
                            <h3 class="text-lg font-bold text-gray-900">{{ skin.displayName }}</h3>
                            <p v-if="skin.chromas.length > 1" class="text-sm text-gray-500">Variants Available: {{ skin.chromas.length }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const weapon = ref(null)

onMounted(async () => {
    const { uuid } = route.params
    const response = await axios.get(`https://valorant-api.com/v1/weapons/${uuid}`)
    weapon.value = response.data.data
})

const formatWallPenetration = (value) => {
    switch (value) {
        case 'EWallPenetrationDisplayType::Low':
            return 'Low'
        case 'EWallPenetrationDisplayType::Medium':
            return 'Medium'
        case 'EWallPenetrationDisplayType::High':
            return 'High'
        default:
            return 'Unknown'
    }
}
</script>

<style scoped>
.container {
    padding: 1rem;
}

table {
    border-collapse: collapse;
    width: 100%;
}

table th,
table td {
    border: 1px solid #ddd;
    padding: 8px;
}

table th {
    background-color: #f2f2f2;
}
</style>
