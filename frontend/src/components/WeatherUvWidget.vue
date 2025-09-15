<template>
  <section class="card">
    <h3>STAT DATA</h3>
    <div class="grid">
      <div class="subcard">
        <h4>UV Index</h4>
        <p v-if="isLoadingUv">Loading UV…</p>
        <p v-else-if="uvError">Error: {{ uvError }}</p>
        <p v-else>{{ uvIndex ?? '-' }}</p>
      </div>

      <div class="subcard">
        <h4>Weather (Dromana)</h4>
        <p v-if="isLoadingWeather">Loading weather…</p>
        <p v-else-if="weatherError">Error: {{ weatherError }}</p>
        <div v-else>
          <div>Temp: {{ weather?.temp }} °C</div>
          <div>Desc: {{ weather?.description }}</div>
          <div>Humidity: {{ weather?.humidity }}%</div>
          <div>Wind: {{ weather?.windSpeed }} m/s</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY || 'a7f7e34d892b94d341f19b3252f8c992';
const DROMANA = { lat: -38.33, lon: 145.0 };

const weather = ref<any>(null);
const uvIndex = ref<number|null>(null);
const isLoadingWeather = ref(false);
const isLoadingUv = ref(false);
const weatherError = ref<string|null>(null);
const uvError = ref<string|null>(null);

const fetchWeather = async () => {
  try{
    isLoadingWeather.value = true; weatherError.value = null;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Dromana,AU&units=metric&appid=${OPEN_WEATHER_API_KEY}`);
    if(!res.ok) throw new Error(`Weather ${res.status}`);
    const data = await res.json();
    weather.value = {
      temp: data.main?.temp,
      description: data.weather?.[0]?.description ?? "",
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      icon: data.weather?.[0]?.icon ?? "",
    };
  }catch(err:any){
    weatherError.value = err?.message ?? "Failed to fetch weather";
  }finally{
    isLoadingWeather.value = false;
  }
};

const fetchUv = async () => {
  try{
    isLoadingUv.value = true; uvError.value = null;
    const { lat, lon } = DROMANA;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`);
    if(!res.ok){ throw new Error(`UV ${res.status}`); }
    const data = await res.json();
    uvIndex.value = typeof data.value === "number" ? data.value : null;
  }catch(err:any){
    uvError.value = err?.message ?? "Failed to fetch UV index";
  }finally{
    isLoadingUv.value = false;
  }
};

onMounted(() => { fetchWeather(); fetchUv(); });
</script>

<style scoped>
.card { padding:16px; border:1px solid #eee; border-radius:12px; margin:16px 0; }
.grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.subcard { border:1px solid #eee; border-radius:12px; padding:12px; }
</style>


