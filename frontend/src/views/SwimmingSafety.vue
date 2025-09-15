<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Today's Swimming Safety</h2>

    <!-- 🌊 Beach Dropdown -->
    <div class="mb-3 text-center">
      <label for="beach" class="form-label fw-bold">Select Beach:</label>
      <select v-model="selectedBeach" id="beach" class="form-select w-auto d-inline-block">
        <option v-for="beach in beachOptions" :key="beach" :value="beach">
          {{ beach }}
        </option>
      </select>
    </div>

    <!-- 📦 Safety Card -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

import axios from "axios";

const selectedBeach = ref("Frankston Beach");
const status = ref("");
const reason = ref("");
const date = ref("");

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

const fetchSafety = async () => {
  try {
    const response = await axios.get(`/api/today-safety?beach=${encodeURIComponent(selectedBeach.value)}`);
    status.value = response.data.status;
    reason.value = response.data.reason;
    date.value = response.data.date;
  } catch (error) {
    console.error("Safety fetch error:", error);
    status.value = "";
    reason.value = "";
    date.value = "";
  }
};

onMounted(fetchSafety);
watch(selectedBeach, fetchSafety);

const formattedDate = computed(() => {
  if (!date.value) return "";
  const options: Intl.DateTimeFormatOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  return new Date(date.value).toLocaleDateString(undefined, options);
});
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
}
</style>
