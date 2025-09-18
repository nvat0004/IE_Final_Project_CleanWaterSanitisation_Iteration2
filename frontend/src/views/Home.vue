<template>
  <div class="home">
    <!-- Hero Video Section -->
    <HeroVideo :dashboardRef="dashboardRef" :featuresRef="featuresRef" />

    <section ref="dashboardRef" class="section fade-in">
      <div class="section-head">
        <h2 class="section-title">Beach Conditions Dashboard</h2>
      </div>
      <div class="grid panels">
        <router-link to="/weather" class="panel">
          <Card class="panel-card">
            <template #header>
              <div class="panel-head"><h5>☀️ UV Index</h5></div>
            </template>
            <template #content>
              <p class="panel-sub">UV index and sun safety information</p>
              <div class="panel-body">
                <div v-if="isLoadingUv" class="loading">
                  <ProgressSpinner style="width: 2rem; height: 2rem" strokeWidth="4" animationDuration="1s" />
                  <p class="muted">Loading...</p>
                </div>
                <Message v-else-if="uvError" severity="error" :closable="false" class="w-100">{{ uvError }}</Message>
                <div v-else class="kpi"><span>{{ uvIndex ?? '-' }}</span></div>
              </div>
            </template>
          </Card>
        </router-link>

        <router-link to="/weather" class="panel">
          <Card class="panel-card">
            <template #header>
              <div class="panel-head"><h5>🌤️ Weather Conditions</h5></div>
            </template>
            <template #content>
              <p class="panel-sub">Current weather data</p>
              <div class="panel-body">
                <div v-if="isLoadingWeather" class="loading">
                  <ProgressSpinner style="width: 2rem; height: 2rem" strokeWidth="4" animationDuration="1s" />
                  <p class="muted">Loading...</p>
                </div>
                <Message v-else-if="weatherError" severity="error" :closable="false" class="w-100">{{ weatherError }}</Message>
                <div v-else class="weather">
                  <p><strong>{{ weather?.temp }}°C</strong></p>
                  <p>{{ weather?.description }}</p>
                  <p>Humidity: {{ weather?.humidity }}%</p>
                  <p>Wind: {{ weather?.windSpeed }} m/s</p>
                </div>
              </div>
            </template>
          </Card>
        </router-link>

        <router-link to="/safety" class="panel">
          <Card class="panel-card">
            <template #header>
              <div class="panel-head"><h5>🏊 Swimming Safety</h5></div>
            </template>
            <template #content>
              <p class="panel-sub">Today's safety status</p>
              <div class="panel-body">
                <p class="muted">Click to view full details</p>
              </div>
            </template>
          </Card>
        </router-link>

        <router-link to="/predict" class="panel">
          <Card class="panel-card">
            <template #header>
              <div class="panel-head"><h5>🔮 Prediction Model Results</h5></div>
            </template>
            <template #content>
              <p class="panel-sub">Water quality predictions</p>
              <div class="panel-body">
                <p class="muted">Click here to view forecasts</p>
              </div>
            </template>
          </Card>
        </router-link>
      </div>
    </section>

    <section class="section fade-in">
      <div class="grid one">
        <router-link to="/recycle-quiz" class="panel">
          <Card class="panel-card center">
            <template #header>
              <div class="panel-head"><h5>🗑️ Trash Quiz</h5></div>
            </template>
            <template #content>
              <p class="panel-sub">Test your recycling knowledge</p>
              <div class="panel-body"><p class="muted">Play now & learn about Aussie bin rules!</p></div>
            </template>
          </Card>
        </router-link>
      </div>
    </section>

    

    <section ref="featuresRef" class="section fade-in">
      <div class="section-head"><h3 class="section-subtitle">What We Provide</h3></div>
      <div class="grid three">
        <div v-for="(item, i) in features" :key="i" class="panel">
          <Card class="panel-card h-100">
            <template #content>
              <div class="tile">
                <h5>{{ item.icon }} {{ item.title }}</h5>
                <p class="muted">{{ item.description }}</p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <section class="section fade-in">
      <div class="section-head"><h3 class="section-subtitle">Who We Help</h3></div>
      <div class="grid three">
        <div v-for="(group, i) in audiences" :key="i" class="panel">
          <Card class="panel-card h-100">
            <template #content>
              <div class="tile">
                <h5>{{ group.icon }} {{ group.title }}</h5>
                <p class="muted">{{ group.description }}</p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Articles below: back to link list -->
    <section class="section fade-in">
      <div class="section-head"><h3 class="section-subtitle">Articles</h3></div>
      <ArticleSlider :articles="articleLinks" />
    </section>

    <footer class="footer">
      <small>© 2025 AquaProtect - TA22 Team</small>
      <small>Keeping families safe at Dromana Beach</small>
    </footer>
  </div>

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
import ArticleSlider from '@/components/ArticleSlider.vue';
import HeroVideo from '@/components/HeroVideo.vue';

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY || 'a7f7e34d892b94d341f19b3252f8c992';
const DROMANA = { lat: -38.33, lon: 145.0 };

// Refs for HeroVideo scroll targets
const dashboardRef = ref<HTMLElement | null>(null);
const featuresRef = ref<HTMLElement | null>(null);

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
.home {
  --bg: #EEF2F5;
  --panel: #FFFFFF;
  --ink: #111827;
  --sub: #4B5563;
  --muted: #6B7280;
  --radius-xl: 24px;
  --shadow: 0 8px 28px rgba(17,24,39,.08);
  --shadow-lg: 0 12px 40px rgba(17,24,39,.1);
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section { 
  max-width: 1200px; 
  width: 100%; 
  margin: 0 auto; 
  padding: 3rem 1.25rem;
}

/* Dashboard section 特殊样式 */
.section:first-of-type {
  padding-top: 3rem;
}

/* Hero */
.hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 2rem; align-items: center; }
.hero-left { padding: 2.5rem; background: var(--panel); border-radius: var(--radius-xl); box-shadow: var(--shadow); }
.hero-right { height: 340px; border-radius: var(--radius-xl); background: var(--panel); box-shadow: var(--shadow); opacity: .6; }
.hero-title { margin: 0 0 1rem; display: flex; flex-direction: column; gap: .25rem; }
.hero-title .bold { font-weight: 900; font-size: 3rem; letter-spacing: -0.02em; }
.hero-title .italic { font-style: italic; font-size: 3rem; color: var(--sub); }
.hero-sub { color: var(--muted); font-size: 1.05rem; line-height: 1.7; margin: 0 0 1.25rem; }
.hero-actions { display: flex; gap: .75rem; }
.btn { display: inline-flex; align-items: center; justify-content: center; height: 44px; padding: 0 18px; border-radius: 999px; text-decoration: none; font-weight: 700; border: 1px solid transparent; transform: translateZ(0); transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease, color .2s ease; }
.btn.primary { background: #111827; color: #fff; box-shadow: var(--shadow); }
.btn.ghost { background: transparent; color: var(--ink); border-color: #E5E7EB; }
.btn:hover { transform: scale(1.03); }
.btn:focus-visible { outline: 3px solid #94A3B8; outline-offset: 2px; }

/* Sections */
.section-head { margin-bottom: 1.25rem; text-align: left; }
.section-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
.section-subtitle { font-size: 1.5rem; font-weight: 700; color: var(--ink); }

/* Grid */
.grid { display: grid; gap: 1rem; }
.grid.panels { grid-template-columns: repeat(4, 1fr); }
.grid.one { grid-template-columns: 1fr; }
.grid.three { grid-template-columns: repeat(3, 1fr); }

/* Panel/Card */
.panel { text-decoration: none; }
.panel-card { background: var(--panel); border-radius: var(--radius-xl); box-shadow: var(--shadow); border: 1px solid #edf2f7; display: block; height: 100%; transition: transform .22s ease, box-shadow .22s ease; }
.panel-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.panel-card.center { text-align: center; }
.panel-head { padding: 1rem 1rem 0; }
.panel-head h5 { margin: 0; font-weight: 800; letter-spacing: -0.01em; }
.panel-sub { margin: .25rem 1rem 0; color: var(--muted); font-size: .95rem; }
.panel-body { padding: 1rem; min-height: 120px; display: grid; place-items: center; text-align: center; }
.loading { display: grid; place-items: center; gap: .5rem; }
.kpi span { font-size: 2.75rem; font-weight: 900; }
.weather { color: var(--sub); line-height: 1.6; }
.muted { color: var(--muted); margin: 0; }

/* Articles */
.article-list { display: grid; gap: .5rem; padding: .5rem; }
.article-item { padding: .75rem 1rem; border-radius: 14px; transition: background-color .2s ease, transform .2s ease; }
.article-item:hover { background: #F3F4F6; transform: translateX(2px); }
.article-link { color: var(--ink); text-decoration: none; font-weight: 600; }
.article-link:hover { text-decoration: underline; }
.article-link:focus-visible { outline: 3px solid #94A3B8; outline-offset: 2px; border-radius: 10px; }

/* (removed) carousel styles cleaned */

/* Tiles (features/audience) */
.tile { padding: 1.25rem 1.25rem 1.5rem; text-align: center; }
.tile h5 { margin: 0 0 .5rem; font-weight: 800; }

/* Footer */
.footer { max-width: 1200px; width: 100%; margin: 0 auto; background: var(--panel); border: 1px solid #edf2f7; border-radius: var(--radius-xl); box-shadow: var(--shadow); padding: 1.25rem; text-align: center; color: var(--sub); display: grid; gap: .25rem; }

/* Animations */
.fade-in { animation: fadeIn .6s ease both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Back to top */
.back-to-top-fixed { position: fixed; bottom: 2rem; right: 2rem; z-index: 1000; box-shadow: var(--shadow); transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease; opacity: .95; }
.back-to-top-fixed:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); opacity: 1; }

/* Focus ring for panels */
.panel:focus-visible { outline: 3px solid #94A3B8; outline-offset: 4px; border-radius: var(--radius-xl); }

/* Responsive */
@media (max-width: 1024px) {
  .grid.panels { grid-template-columns: repeat(2, 1fr); }
  .grid.three { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; }
  .hero-right { height: 220px; }
}

@media (max-width: 520px) {
  .grid.panels, .grid.three { grid-template-columns: 1fr; }
  .hero-title .bold, .hero-title .italic { font-size: 2.1rem; }
}
</style>



