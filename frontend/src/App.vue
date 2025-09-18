<template>
  <NavBar />
  <router-view />
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body { 
  margin: 0; 
  padding: 0;
  font-family: system-ui, Arial, sans-serif; 
}

#app {
  margin: 0;
  padding: 0;
}
</style>
