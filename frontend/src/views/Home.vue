<template>
  <div class="home-wrapper text-dark">
    <div class="container py-5">
      <!-- Header Section -->
      <header class="page-header text-center mb-5">
        <div class="header-content">
          <h1 class="main-title">
            <i class="fas fa-water me-2"></i> Keep Your Family Safe at Beach
          </h1>
          <p class="main-subtitle">
            Get real-time water quality updates and make informed decisions about beach safety after rainfall.
          </p>
        </div>
      </header>

      <!-- Beach Conditions Dashboard -->
      <section class="dashboard-section mb-5">
        <div class="dashboard-header">
          <h2 class="section-title">Beach Conditions Dashboard</h2>
        </div>
        
        <!-- Main Dashboard Container -->
        <div class="dashboard-container">
          <div class="dashboard-grid row g-4 justify-content-center">
          
          <!-- UV Index Card -->
          <div class="col-md-6 col-lg-3">
            <router-link to="/weather" class="card-link">
              <Card class="dashboard-card gradient-orange">
                <template #header>
                  <div class="card-header">
                    <h5 class="card-title"><span>☀️</span> UV Index</h5>
                  </div>
                </template>
                <template #content>
                  <div class="card-body">
                    <p class="card-subtitle">UV index and sun safety information</p>
                    <div class="data-box">
                      <div v-if="isLoadingUv" class="loading-container">
                        <ProgressSpinner 
                          style="width: 2rem; height: 2rem" 
                          strokeWidth="4"
                          animationDuration="1s"
                        />
                        <p class="mt-2 mb-0">Loading...</p>
                      </div>
                      <Message v-else-if="uvError" severity="error" :closable="false" class="w-100">
                        {{ uvError }}
                      </Message>
                      <div v-else class="data-display">
                        <p class="display-6 fw-bold mb-0">{{ uvIndex ?? '-' }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </router-link>
          </div>

          <!-- Weather Conditions Card -->
          <div class="col-md-6 col-lg-3">
            <router-link to="/weather" class="card-link">
              <Card class="dashboard-card gradient-blue">
                <template #header>
                  <div class="card-header">
                    <h5 class="card-title"><span>🌤️</span> Weather Conditions</h5>
                  </div>
                </template>
                <template #content>
                  <div class="card-body">
                    <p class="card-subtitle">Current weather data</p>
                    <div class="data-box">
                      <div v-if="isLoadingWeather" class="loading-container">
                        <ProgressSpinner 
                          style="width: 2rem; height: 2rem" 
                          strokeWidth="4"
                          animationDuration="1s"
                        />
                        <p class="mt-2 mb-0">Loading...</p>
                      </div>
                      <Message v-else-if="weatherError" severity="error" :closable="false" class="w-100">
                        {{ weatherError }}
                      </Message>
                      <div v-else class="weather-data">
                        <p class="mb-1"><strong>{{ weather?.temp }}°C</strong></p>
                        <p class="mb-1">{{ weather?.description }}</p>
                        <p class="mb-1">Humidity: {{ weather?.humidity }}%</p>
                        <p class="mb-0">Wind: {{ weather?.windSpeed }} m/s</p>
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </router-link>
          </div>

          <!-- Swimming Safety Card -->
          <div class="col-md-6 col-lg-3">
            <router-link to="/safety" class="card-link">
              <Card class="dashboard-card gradient-teal">
                <template #header>
                  <div class="card-header">
                    <h5 class="card-title"><span>🏊</span> Swimming Safety</h5>
                  </div>
                </template>
                <template #content>
                  <div class="card-body">
                    <p class="card-subtitle">Today's safety status</p>
                    <div class="data-box">
                      <p class="placeholder-text mb-0">Click to view full details</p>
                    </div>
                  </div>
                </template>
              </Card>
            </router-link>
          </div>

          <!-- 7-Day Prediction Card -->
          <div class="col-md-6 col-lg-3">
            <router-link to="/predict" class="card-link">
              <Card class="dashboard-card gradient-purple">
                <template #header>
                  <div class="card-header">
                    <h5 class="card-title"><span>🔮</span> Prediction Model Results</h5>
                  </div>
                </template>
                <template #content>
                  <div class="card-body">
                    <p class="card-subtitle">Water quality predictions</p>
                    <div class="data-box">
                      <p class="placeholder-text mb-0">Click here to view forecasts</p>
                    </div>
                  </div>
                </template>
              </Card>
            </router-link>
          </div>
          </div>
        </div>
      </section>

      <!-- Trash Quiz Section - Outside Dashboard -->
      <section class="quiz-section mb-5">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <router-link to="/recycle-quiz" class="card-link">
              <Card class="quiz-card gradient-green">
                <template #header>
                  <div class="card-header">
                    <h5 class="card-title"><span>🗑️</span> Trash Quiz</h5>
                  </div>
                </template>
                <template #content>
                  <div class="card-body">
                    <p class="card-subtitle">Test your recycling knowledge</p>
                    <div class="data-box">
                      <p class="text-muted mb-0">Play now & learn about Aussie bin rules!</p>
                    </div>
                  </div>
                </template>
              </Card>
            </router-link>
          </div>
        </div>
      </section>

      <Divider class="my-5" />

      <!-- Articles Section -->
      <section class="articles-section mb-5">
        <div class="articles-header">
          <h3 class="section-subtitle">
            <i class="fas fa-newspaper me-2"></i> Articles
          </h3>
        </div>
        <div class="articles-content">
          <Card class="articles-card">
            <template #content>
              <div class="article-list">
                <div 
                  v-for="(article, i) in articleLinks" 
                  :key="i" 
                  class="article-item"
                >
                  <a 
                    :href="article.url" 
                    target="_blank" 
                    class="article-link"
                    :aria-label="`Read article: ${article.title}`"
                  >
                    {{ article.title }}
                  </a>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </section>

      <Divider class="my-5" />

      <!-- Features Section -->
      <section class="features-section mb-5">
        <div class="features-header">
          <h3 class="section-subtitle">What We Provide</h3>
        </div>
        <div class="features-grid row text-center g-4">
          <div v-for="(item, i) in features" :key="i" class="col-md-4">
            <Card class="feature-card h-100">
              <template #content>
                <div class="feature-content">
                  <h5 class="fw-bold mb-3">{{ item.icon }} {{ item.title }}</h5>
                  <p class="text-muted mb-0">{{ item.description }}</p>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </section>

      <Divider class="my-5" />

      <!-- Audiences Section -->
      <section class="audiences-section mb-5">
        <div class="audiences-header">
          <h3 class="section-subtitle">Who We Help</h3>
        </div>
        <div class="audiences-grid row text-center g-4">
          <div v-for="(group, i) in audiences" :key="i" class="col-md-4">
            <Card class="audience-card h-100">
              <template #content>
                <div class="audience-content">
                  <h5 class="fw-bold mb-3">{{ group.icon }} {{ group.title }}</h5>
                  <p class="text-muted mb-0">{{ group.description }}</p>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </section>

      <!-- Footer Section -->
      <footer class="page-footer footer text-center text-dark py-4 mt-auto">
        <div class="footer-content">
          <small>© 2025 AquaProtect - TA22 Team</small><br />
          <small>Keeping families safe at Dromana Beach</small>
        </div>
      </footer>

    </div>
  </div>

  <!-- Fixed Back to Top Button -->
  <Button 
    class="back-to-top-fixed"
    icon="pi pi-arrow-up" 
    severity="secondary"
    outlined
    rounded
    size="large"
    @click="scrollToTop"
    aria-label="Scroll to top of page"
  />
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
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
}

.card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}

/* Dashboard Container */
.dashboard-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #dee2e6;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}

.dashboard-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #28a745, #ffc107, #dc3545);
  border-radius: 20px 20px 0 0;
}

.dashboard-card {
  border-radius: 1rem;
  color: #333;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  border: none;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1rem;
  margin: 0;
}

.card-title {
  font-weight: 700;
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
  letter-spacing: -0.025em;
}

.card-subtitle {
  font-style: italic;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.data-box {
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1.5rem;
  border-radius: 0.75rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.data-display {
  text-align: center;
}

.weather-data {
  text-align: left;
  font-size: 1rem;
  color: #ffffff;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.weather-data p {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.weather-data p strong {
  font-size: 1.2rem;
  font-weight: 800;
}

.data-display p {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  text-align: center;
}


/* Gradient themes for each card */
.gradient-orange { background: linear-gradient(135deg, #f57c00, #fbc02d); }
.gradient-blue { background: linear-gradient(135deg, #0288d1, #03a9f4); }
.gradient-teal { background: linear-gradient(135deg, #00796b, #4db6ac); }
.gradient-purple { background: linear-gradient(135deg, #8e24aa, #d81b60); }
.gradient-green { background: linear-gradient(135deg, #388e3c, #66bb6a); }

/* Quiz Section */
.quiz-section {
  text-align: center;
}

.quiz-card {
  border-radius: 1rem;
  color: #333;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;
  border: none;
  max-width: 400px;
  margin: 0 auto;
}

.quiz-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

/* Articles Section */
.articles-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-item {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.article-item:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.article-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  line-height: 1.5;
  display: block;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.article-link:hover {
  color: #007bff;
  text-decoration: underline;
  transform: translateX(4px);
}

/* Features and Audiences Cards */
.feature-card,
.audience-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover,
.audience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.feature-content,
.audience-content {
  padding: 1.5rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-content h5,
.audience-content h5 {
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
}

.feature-content p,
.audience-content p {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  font-weight: 400;
}

/* Footer */
.footer {
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.3);
  color: #2c3e50;
  border-radius: 1rem 1rem 0 0;
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

/* Navigation */
.navigation-section {
  margin-top: 2rem;
  padding: 1rem 0;
}

.back-to-top-wrapper {
  display: flex;
  justify-content: center;
}

/* Main Typography */
.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1565c0;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  color: #2c3e50;
  line-height: 1.4;
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1565c0;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.025em;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.025em;
}

/* Make space for fixed button - all screen sizes */
.container {
  padding-right: 5rem;
  flex: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-wrapper {
    padding-bottom: 2rem;
  }
  
  /* Make space for fixed button */
  .container {
    padding-right: 4rem;
  }
  
  .main-title {
    font-size: 2.25rem;
  }
  
  .main-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-subtitle {
    font-size: 1.25rem;
  }
  
  .dashboard-container {
    padding: 1.5rem;
    border-radius: 15px;
  }
  
  .quiz-card {
    max-width: 350px;
  }
  
  .dashboard-grid {
    gap: 1rem;
  }
  
  .data-box {
    min-height: 100px;
    padding: 1.25rem;
  }
  
  .data-display p {
    font-size: 2.75rem;
  }
  
  .weather-data {
    font-size: 0.95rem;
  }
  
  .weather-data p strong {
    font-size: 1.15rem;
  }
  
  .placeholder-text {
    font-size: 1.05rem;
  }
  
  /* Adjust fixed button position on medium screens */
  .back-to-top-fixed {
    bottom: 1.5rem;
    right: 1.5rem;
  }
  
  .feature-content,
  .audience-content {
    padding: 1rem;
  }
  
  .article-item {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 1rem;
    padding-right: 5rem; /* Make space for fixed button */
  }
  
  .main-title {
    font-size: 1.75rem;
  }
  
  .main-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .dashboard-container {
    padding: 1rem;
    border-radius: 12px;
  }
  
  .quiz-card {
    max-width: 300px;
  }
  
  .dashboard-card {
    margin-bottom: 1rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-header {
    padding: 0.75rem;
  }
  
  .data-box {
    min-height: 70px;
    padding: 0.75rem;
  }
  
  .data-display p {
    font-size: 2.5rem;
  }
  
  .weather-data {
    font-size: 0.9rem;
  }
  
  .weather-data p strong {
    font-size: 1.1rem;
  }
  
  .placeholder-text {
    font-size: 1rem;
  }
  
  /* Adjust fixed button position on small screens */
  .back-to-top-fixed {
    bottom: 1rem;
    right: 1rem;
    transform: scale(0.9);
  }
  
}

/* Fixed Back to Top Button */
.back-to-top-fixed {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  opacity: 0.9;
}

.back-to-top-fixed:hover {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Accessibility improvements */
.card-link:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
  border-radius: 1rem;
}

.article-link:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

/* Smooth transitions */
* {
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.3s ease;
}
</style>



