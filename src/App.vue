<template>
    <NavBar />
    <div class="container px-4 md:px-10 lg:px-20 xl:px-24 min-h-screen pb-20 pt-10">
        <RouterView />
    </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style scoped></style>
