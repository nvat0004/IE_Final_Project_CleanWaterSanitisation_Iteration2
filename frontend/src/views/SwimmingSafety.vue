<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Today's Swimming Safety</h2>

    <!-- 🌊 Beach Dropdown -->
    <div class="mb-3 text-center">
      <label for="beach" class="form-label fw-bold">Select Beach:</label>
      <select v-model="selectedBeach" id="beach" class="form-select w-auto d-inline-block">
        <option v-for="beach in beachOptions" :key="beach.name" :value="beach.name">
          {{ beach.name }}
        </option>
      </select>
    </div>

    <!-- 🧾 Status Card (Moved up here) -->
    <div
      v-if="status"
      class="card text-center mx-auto shadow p-3 mb-4"
      style="max-width: 500px;"
      :class="{
        'border-success': status === 'Safe',
        'border-warning': status === 'Moderate',
        'border-danger': status === 'Dangerous'
      }"
    >
      <div class="card-body">
        <h5 class="card-title">{{ formattedDate }}</h5>
        <p
          class="card-text fw-bold fs-4"
          :class="{
            'text-success': status === 'Safe',
            'text-warning': status === 'Moderate',
            'text-danger': status === 'Dangerous'
          }"
        >
          {{ status }}
        </p>
        <p class="card-text">{{ reason }}</p>
      </div>
    </div>

    <!-- ❌ Fallback -->
    <div v-if="!status" class="text-center mt-4 text-muted">
      No safety data available for the selected beach.
    </div>

    <!-- 🗺 Map Section -->
    <div class="position-relative">
      <div id="map" style="height: 400px; width: 100%; border-radius: 10px;"></div>

      <!-- 🟢 Legend in top-right -->
      <div class="map-legend position-absolute top-0 end-0 p-2 bg-white rounded shadow-sm m-2">
         <strong class="d-block mb-1">Legend</strong>
        <div><span class="legend-dot bg-success"></span> Safe</div>
        <div><span class="legend-dot bg-warning"></span> Moderate</div>
        <div><span class="legend-dot bg-danger"></span> Dangerous</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const selectedBeach = ref("Frankston Beach");
const status = ref("");
const reason = ref("");
const date = ref("");

const map = ref<any>(null);
const markers = ref<any[]>([]);

const beachOptions = [
  //{ name: "Frankston Beach", lat: -38.1416, lng: 145.1237 },
  { name: "Carrum Beach", lat: -38.0652, lng: 145.1214 },
  { name: "St Kilda Beach", lat: -37.8675, lng: 144.9731 },
  { name: "Dromana Beach", lat: -38.3337, lng: 144.9658 },
  { name: "Port Melbourne Beach", lat: -37.8399, lng: 144.9390 },
  { name: "Altona Beach", lat: -37.8686, lng: 144.8297 }
];

const formattedDate = computed(() => {
  if (!date.value) return "";
  const options: Intl.DateTimeFormatOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  return new Date(date.value).toLocaleDateString(undefined, options);
});

// Fetch individual beach safety
const fetchSafety = async () => {
  try {
    const response = await axios.get(`/api/today-safety?beach=${encodeURIComponent(selectedBeach.value)}`);
    status.value = response.data.status;
    reason.value = response.data.reason;
    date.value = response.data.date;
  } catch (error) {
    console.error("Error fetching safety:", error);
    status.value = "";
    reason.value = "";
    date.value = "";
  }
};

// Fetch all beach safety and plot on map
const fetchAllSafety = async () => {
  markers.value.forEach(m => m.remove());
  markers.value = [];

  for (const beach of beachOptions) {
    try {
      const res = await axios.get(`/api/today-safety?beach=${encodeURIComponent(beach.name)}`);
      const s = res.data.status;
      const color = s === "Safe" ? "green" : s === "Moderate" ? "orange" : "red";

      const marker = L.circleMarker([beach.lat, beach.lng], {
        radius: 10,
        fillColor: color,
        color: "#000",
        weight: 1,
        fillOpacity: 0.8
      })
        .addTo(map.value)
        .bindPopup(`<b>${beach.name}</b><br>Status: ${s}`)
        .on("click", () => {
          selectedBeach.value = beach.name;
        });

      markers.value.push(marker);
    } catch (err) {
      console.error("Map fetch failed for:", beach.name);
    }
  }
};

const initMap = () => {
  map.value = L.map("map").setView([-37.9, 145.0], 9);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map.value);
};

onMounted(() => {
  initMap();
  fetchSafety();
  fetchAllSafety();
});

watch(selectedBeach, () => {
  fetchSafety();
});
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
}

#map {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.map-legend {
  font-size: 0.9rem;
  z-index: 1000;
  width: 120px;
}

.legend-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}
</style>