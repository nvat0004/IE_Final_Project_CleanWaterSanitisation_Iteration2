<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">7-Day Swimming Safety Prediction</h2>

    <!-- 🌊 Beach Dropdown -->
    <div class="mb-3 text-center">
      <label for="beach" class="form-label fw-bold">Select Beach:</label>
      <select v-model="selectedBeach" id="beach" class="form-select w-auto d-inline-block">
        <option v-for="beach in beachOptions" :key="beach" :value="beach">
          {{ beach }}
        </option>
      </select>
    </div>

    <!-- 🟢 Legend -->
    <div class="text-center mb-3">
      <span class="badge bg-success me-2">Safe</span>
      <span class="badge bg-warning text-dark me-2">Moderate</span>
      <span class="badge bg-danger">Dangerous</span>
    </div>

    <!-- 📅 Prediction Cards -->
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="(prediction, index) in predictions" :key="index">
        <div
          class="card h-100 shadow"
          :class="{
            'border-success': prediction.status === 'Safe',
            'border-warning': prediction.status === 'Moderate',
            'border-danger': prediction.status === 'Dangerous'
          }"
        >
          <div class="card-body">
            <h5 class="card-title">{{ formatDate(prediction.date) }}</h5>
            <p
              class="card-text fw-bold"
              :class="{
                'text-success': prediction.status === 'Safe',
                'text-warning': prediction.status === 'Moderate',
                'text-danger': prediction.status === 'Dangerous'
              }"
            >
              {{ prediction.status }}
            </p>
            <p class="card-text">{{ prediction.reason }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ❌ Fallback -->
    <div v-if="predictions.length === 0" class="text-center mt-4 text-muted">
      No predictions available. Please try another beach.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const selectedBeach = ref("Frankston Beach");
const predictions = ref([]);

const beachOptions = [
  //"Frankston Beach",
  "Carrum Beach",
  "St Kilda Beach",
  //"Brighton Beach",
  //"Elwood Beach",
  "Dromana Beach",
  "Port Melbourne Beach",
  "Altona Beach"
];

// Fetch predictions when beach is selected
const fetchPredictions = async () => {
  try {
    const response = await axios.get(`/api/predict?beach=${encodeURIComponent(selectedBeach.value)}`);
    predictions.value = response.data;
  } catch (error) {
    console.error("Prediction fetch error:", error);
    predictions.value = [];
  }
};

// Auto-fetch on mount and when beach changes
onMounted(fetchPredictions);
watch(selectedBeach, fetchPredictions);

// Format date to readable
const formatDate = (isoDate: string): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.card-title {
  font-size: 1.1rem;
}
</style>
