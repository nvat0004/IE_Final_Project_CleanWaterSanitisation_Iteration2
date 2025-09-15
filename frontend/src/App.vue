<template>
  <NavBar />
  <router-view />
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
body { margin:0; font-family: system-ui, Arial, sans-serif; }
</style>
