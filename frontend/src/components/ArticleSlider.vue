<template>
  <div class="article-slider">
    <Carousel
      :value="slides"
      :numVisible="1"
      :numScroll="1"
      :circular="true"
      :autoplayInterval="5500"
      :showIndicators="true"
      :showNavigators="true"
      :responsiveOptions="responsiveOptions"
      data-testid="article-carousel"
    >
      <template #item="slotProps">
        <div class="slide-card">
          <div class="feature">
            <img
              v-if="slotProps.data.image"
              class="hero-img"
              :src="slotProps.data.image"
              alt="article visual"
            />
            <div v-else class="placeholder" role="img" aria-label="article image placeholder">📷</div>
            <a
              class="title"
              :href="slotProps.data.items[0].url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ slotProps.data.items[0].title }}
            </a>
          </div>
          <div class="sublinks">
            <a
              v-for="(a, idx) in slotProps.data.items.slice(1)"
              :key="idx"
              class="sublink"
              :href="a.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="a.title"
            >
              {{ a.title }}
            </a>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Carousel from 'primevue/carousel';

type Article = { title: string; url: string };

const props = defineProps<{ articles: Article[] }>();

// Import article visuals (placeholders from assets)
// Using Vite alias '@' to resolve to /src
import img1 from '@/assets/article/badwater.jpg';
import img2 from '@/assets/article/badwater2.jpg';
import img3 from '@/assets/article/badwater3.jpg';
import img4 from '@/assets/article/swimbanned.jpg';
import img5 from '@/assets/article/wateract.jpg';
const images = [img1, img2, img3, img4, img5];

// Chunk articles into groups so each slide contains up to 4 items
const groupSize = 4;
const slides = computed(() => {
  const arr: { items: Article[]; image?: string }[] = [];
  let groupIndex = 0;
  for (let i = 0; i < props.articles.length; i += groupSize) {
    const items = props.articles.slice(i, i + groupSize);
    const image = images[groupIndex % images.length];
    arr.push({ items, image });
    groupIndex++;
  }
  return arr.filter(g => g.items.length > 0);
});

// Responsive: smaller screens still show one slide at a time; content inside adapts grid
const responsiveOptions = [
  { breakpoint: '1200px', numVisible: 1, numScroll: 1 },
  { breakpoint: '992px', numVisible: 1, numScroll: 1 },
  { breakpoint: '768px', numVisible: 1, numScroll: 1 }
];
</script>

<style scoped>
.article-slider {
  --panel: #ffffff;
  --muted: #6B7280;
  --ink: #111827;
  --radius: 20px;
  --shadow: 0 8px 28px rgba(17,24,39,.08);
}

.slide-card {
  background: var(--panel);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid #edf2f7;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}

.feature {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1rem;
  align-items: center;
}

.hero-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
}

.placeholder {
  background: #F3F4F6;
  color: #9CA3AF;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 2rem;
  height: 140px;
}

.title {
  color: var(--ink);
  font-weight: 800;
  text-decoration: none;
  line-height: 1.4;
}
.title:hover { text-decoration: underline; }
.title:focus-visible { outline: 3px solid #94A3B8; outline-offset: 2px; border-radius: 8px; }

.sublinks {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .5rem;
}

.sublink {
  background: #F9FAFB;
  border: 1px solid #EEF2F7;
  border-radius: 12px;
  padding: .5rem .75rem;
  text-decoration: none;
  color: var(--ink);
  font-size: .9rem;
  line-height: 1.35;
}
.sublink:hover { text-decoration: underline; }
.sublink:focus-visible { outline: 3px solid #94A3B8; outline-offset: 2px; border-radius: 10px; }

@media (max-width: 992px) {
  .feature { grid-template-columns: 140px 1fr; }
  .hero-img, .placeholder { height: 120px; }
  .sublinks { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .feature { grid-template-columns: 1fr; }
  .hero-img, .placeholder { height: 160px; }
  .sublinks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>


