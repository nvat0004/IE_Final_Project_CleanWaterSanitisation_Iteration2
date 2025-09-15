<template>
  <section class="card">
    <h4>Swimming Safety (Today)</h4>
    <p v-if="loading">Checking…</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <template v-else>
      <p><strong>{{ data.safe ? 'Safe' : 'Not Safe' }}</strong> — {{ data.reason }}</p>
      <small>Enterococci: {{ data.enterococci ?? 'n/a' }}, Recent rain (3d): {{ data.recentRainMm }} mm</small>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const data = ref<any>(null)
const error = ref<string|null>(null)
const loading = ref(false)

onMounted(async () => {
  try{
    loading.value = true
    const res = await fetch('/api/today-safety')
    if(!res.ok) throw new Error('Failed')
    data.value = await res.json()
  }catch(e:any){
    error.value = e.message
  }finally{
    loading.value = false
  }
})
</script>

<style scoped>
.card { padding:16px; border:1px solid #eee; border-radius:12px; margin:16px 0; }
</style>
