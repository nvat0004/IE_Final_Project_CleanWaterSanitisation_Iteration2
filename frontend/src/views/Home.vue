<template>
  <div class="home-wrapper text-white">
    <div class="container py-5">
      <!-- Header Section -->
      <header class="text-center mb-5">
        <h1 class="display-4 fw-bold">
          <i class="fas fa-water me-2"></i> Keep Your Family Safe at Beach
        </h1>
        <p class="lead text-light">
          Get real-time water quality updates and make informed decisions about beach safety after rainfall.
        </p>
      </header>

      <!-- Beach Conditions Dashboard -->
<section class="mb-5">
  <h2 class="text-center mb-4 text-primary fw-bold">Beach Conditions Dashboard</h2>
  <div class="row g-4 justify-content-center">

    <!-- UV Index -->
    <div class="col-md-6 col-lg-3">
      <router-link to="/weather" class="card-link">
        <div class="dashboard-card gradient-orange">
          <h5 class="card-header"><span>☀️</span> UV Index</h5>
          <div class="card-body">
            <p class="card-subtitle">UV index and sun safety information</p>
            <div class="data-box">
              <p v-if="isLoadingUv">Loading...</p>
              <p v-else-if="uvError" class="text-danger">{{ uvError }}</p>
              <p v-else class="display-6 fw-bold">{{ uvIndex ?? '-' }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Weather Conditions -->
    <div class="col-md-6 col-lg-3">
      <router-link to="/weather" class="card-link">
        <div class="dashboard-card gradient-blue">
          <h5 class="card-header"><span>🌤️</span> Weather Conditions</h5>
          <div class="card-body">
            <p class="card-subtitle">Current weather data</p>
            <div class="data-box">
              <div v-if="isLoadingWeather">Loading...</div>
              <div v-else-if="weatherError" class="text-danger">{{ weatherError }}</div>
              <div v-else>
                <p><strong>{{ weather?.temp }}°C</strong></p>
                <p>{{ weather?.description }}</p>
                <p>Humidity: {{ weather?.humidity }}%</p>
                <p>Wind: {{ weather?.windSpeed }} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Swimming Safety -->
    <div class="col-md-6 col-lg-3">
      <router-link to="/safety" class="card-link">
        <div class="dashboard-card gradient-teal">
          <h5 class="card-header"><span>🏊</span> Swimming Safety</h5>
          <div class="card-body">
            <p class="card-subtitle">Today's safety status</p>
            <div class="data-box">
              <p class="text-muted">Click to view full details</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- 7-Day Prediction -->
    <div class="col-md-6 col-lg-3">
      <router-link to="/predict" class="card-link">
        <div class="dashboard-card gradient-purple">
          <h5 class="card-header"><span>🔮</span> Prediction Model Results</h5>
          <div class="card-body">
            <p class="card-subtitle">Water quality predictions</p>
            <div class="data-box">
              <p class="text-muted">Click here to view forecasts</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- ♻️ Trash Quiz (New) -->
    <div class="col-md-6 col-lg-3">
      <router-link to="/recycle-quiz" class="card-link">
        <div class="dashboard-card gradient-green">
          <h5 class="card-header"><span>🗑️</span> Trash Quiz</h5>
          <div class="card-body">
            <p class="card-subtitle">Test your recycling knowledge</p>
            <div class="data-box">
              <p class="text-muted">Play now & learn about Aussie bin rules!</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

  </div>
</section>

      <!-- Articles Section -->
      <section class="mb-5">
        <h3 class="text-center mb-4"><i class="fas fa-newspaper me-2"></i> Articles</h3>
        <ul class="article-list">
          <li v-for="(article, i) in articleLinks" :key="i">
            <a :href="article.url" target="_blank">{{ article.title }}</a>
          </li>
        </ul>
      </section>

      <!-- What We Provide -->
      <section class="mb-5">
        <h3 class="text-center mb-4">What We Provide</h3>
        <div class="row text-center g-4">
          <div v-for="(item, i) in features" :key="i" class="col-md-4">
            <div class="card p-4 shadow-lg border-0 rounded-4 h-100">
              <h5 class="fw-bold">{{ item.icon }} {{ item.title }}</h5>
              <p class="text-muted">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Who We Help -->
      <section class="mb-5">
        <h3 class="text-center mb-4">Who We Help</h3>
        <div class="row text-center g-4">
          <div v-for="(group, i) in audiences" :key="i" class="col-md-4">
            <div class="card p-4 shadow-lg border-0 rounded-4 h-100">
              <h5 class="fw-bold">{{ group.icon }} {{ group.title }}</h5>
              <p class="text-muted">{{ group.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer text-center text-white py-4 mt-5" style="background: linear-gradient(to right, #1565c0, #1976d2);">
        <div>
          <small>© 2025 AquaProtect - TA22 Team</small><br />
          <small>Keeping families safe at Dromana Beach</small>
        </div>
      </footer>

      <!-- Back to Top Button -->
      <div class="text-center">
        <button class="btn btn-outline-light rounded-pill shadow-sm" @click="scrollToTop">
          <i class="fas fa-arrow-up"></i> Back to Top
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY || 'a7f7e34d892b94d341f19b3252f8c992';
const DROMANA = { lat: -38.33, lon: 145.0 };

const weather = ref<any>(null);
const uvIndex = ref<number | null>(null);
const isLoadingWeather = ref(true);
const isLoadingUv = ref(true);
const weatherError = ref<string | null>(null);
const uvError = ref<string | null>(null);

const fetchWeather = async () => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Dromana,AU&units=metric&appid=${OPEN_WEATHER_API_KEY}`);
    if (!res.ok) throw new Error(`Weather ${res.status}`);
    const data = await res.json();
    weather.value = {
      temp: data.main?.temp,
      description: data.weather?.[0]?.description ?? '',
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed
    };
  } catch (err: any) {
    weatherError.value = err?.message ?? 'Failed to fetch weather';
  } finally {
    isLoadingWeather.value = false;
  }
};

const fetchUv = async () => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${DROMANA.lat}&lon=${DROMANA.lon}&appid=${OPEN_WEATHER_API_KEY}`);
    if (!res.ok) throw new Error(`UV ${res.status}`);
    const data = await res.json();
    uvIndex.value = typeof data.value === 'number' ? data.value : null;
  } catch (err: any) {
    uvError.value = err?.message ?? 'Failed to fetch UV index';
  } finally {
    isLoadingUv.value = false;
  }
};

const articleLinks = [
  { title: 'Poor water quality forecast for all beaches in Victoria’s Port Phillip Bay, EPA warns', url: 'https://www.abc.net.au/news/2017-01-20/poor-water-quality-forecast-at-all-beaches-in-port-phillip-bay/8197404' },
  { title: 'Filthy reason some Melbourne beaches are closed to swimmers', url: 'https://www.heraldsun.com.au/news/victoria/melbourne-beaches-not-suitable-for-swimming-after-severe-storms/news-story/6d37ab96514f5fb1fd585be957831f3d' },
  { title: 'Water Quality in Port Phillip Bay still recovering after Victoria’s record floods', url: 'https://www.abc.net.au/news/2023-01-05/victoria-beach-bay-water-quality-epa-melbourne-floods/101826148' },
  { title: 'Health risks at bay and ocean beaches', url: 'https://www.mpnews.com.au/2022/10/31/health-risks-at-bay-and-ocean-beaches/' },
  { title: 'Melbourne’s Port Phillip Bay not suitable for swimming after severe storms', url: 'https://www.abc.net.au/news/2023-12-29/melbourne-bays-poor-water-quality-explainer/103269472' },
  { title: 'The bay has turned brown and swimmers are emerged coated in a strange goo', url: 'https://www.theage.com.au/politics/victoria/the-bay-has-turned-brown-and-swimmers-are-emerging-coated-in-a-strange-goo-20240118-p5ey9u.html' },
  { title: 'Why you should check the water quality before going for a swim in Victoria', url: 'https://www.racv.com.au/royalauto/travel/victoria/swimming-water-quality-victoria.html' }
];

const features = [
  { icon: '📊', title: 'Real-Time Water Quality', description: 'Instant updates on Dromana Beach water quality after rainfall' },
  { icon: '⏰', title: 'Advance Planning', description: 'Forecasts that help plan your beach visits safely' },
  { icon: '🛡️', title: 'Safety Alerts', description: 'Get notified when water becomes unsafe for swimming' },
  { icon: '📚', title: 'Educational Resources', description: 'Understand water safety, indicators, and tips' },
  { icon: '☔️', title: 'Rainfall Impact Analysis', description: 'Know how rain affects beach water quality' }
];

const audiences = [
  { icon: '👨‍👩‍👧', title: 'Parents & Families', description: 'Parents aged 30–50 who prioritize children’s safety and informed beach decisions' },
  { icon: '🌺', title: 'Beach Visitors', description: 'Tourists from Victoria suburbs visiting Dromana Beach after rain' },
  { icon: '🌊', title: 'Water Safety Advocates', description: 'Health-conscious families promoting child-focused beach safety' }
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

onMounted(() => {
  fetchWeather();
  fetchUv();
});
</script>

<style scoped>
.home-wrapper {
  background: linear-gradient(to bottom right, #00b4db, #0083b0);
  min-height: 100vh;
  padding-bottom: 3rem;
}

.card-link {
  text-decoration: none;
}

.dashboard-card {
  border-radius: 1rem;
  color: #333;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  background: white;
}

.dashboard-card:hover {
  transform: scale(1.03);
}

.card-header {
  font-weight: bold;
  color: #fff;
  padding: 1rem;
  font-size: 1.25rem;
}

.card-subtitle {
  font-style: italic;
  margin-bottom: 1rem;
  color: #555;
}

.data-box {
  border: 2px dashed #cce4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fbfd;
}

/* Gradient themes for each card */
.gradient-orange { background: linear-gradient(to right, #f57c00, #fbc02d); }
.gradient-blue { background: linear-gradient(to right, #0288d1, #03a9f4); }
.gradient-teal { background: linear-gradient(to right, #00796b, #4db6ac); }
.gradient-purple { background: linear-gradient(to right, #8e24aa, #d81b60); }

.article-list li {
  margin-bottom: 0.5rem;
}

.article-list a {
  color: #fff;
  text-decoration: underline;
}

.article-list a:hover {
  text-decoration: none;
  color: #f0f8ff;
}

.gradient-green {
  background: linear-gradient(to right, #388e3c, #66bb6a);
}


.footer {
  font-size: 0.9rem;
  background-color: #1565c0;
  color: #fff;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }
}
</style>



