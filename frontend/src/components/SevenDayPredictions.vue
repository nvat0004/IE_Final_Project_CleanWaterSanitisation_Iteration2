<template>
  <section class="card">
    <h4>7-Day Predictions</h4>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error">Error: {{ error }}</p>

    <ul v-else class="list">
      <li v-for="p in preds" :key="p.date">
        <strong>{{ p.date }}</strong> — <span :style="{color: p.safe ? 'green' : 'red'}">{{ p.safe ? 'Safe' : 'Not Safe' }}</span>
        <small> (Reason: {{ p.reason }}, Avg E.coli: {{ p.avgEnterococci }}, Rain: {{ p.recentRainMm }}mm)</small>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const preds = ref<any[]>([])
const loading = ref(false)
const error = ref<string|null>(null)

onMounted(async () => {
  try{
    loading.value = true
    const res = await fetch('/api/predict')
    if(!res.ok) throw new Error('Failed')
    preds.value = await res.json()
  }catch(e:any){ error.value = e.message }
  finally{ loading.value = false }
})
</script>

<style scoped>
.card { padding:16px; border:1px solid #eee; border-radius:12px; margin:16px 0; }
.list { padding-left:16px; }
li { margin:6px 0; }
</style>
