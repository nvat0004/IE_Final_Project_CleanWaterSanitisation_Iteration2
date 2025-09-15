<template>
  <main class="education-wrapper">
    <section>
      <h2>Minerals</h2>
      <div class="carousel">
        <div
          v-for="(item, index) in minerals"
          :key="index"
          class="edu-card"
          @click="selectItem(item)"
        >
          <img :src="item.img" :alt="item.title" class="edu-img" />
          <div class="edu-info">
            <h4>{{ item.title }}</h4>
            <p class="pron">({{ item.pron }}) <button @click.stop="speak(item.pron)">🎤</button></p>
            <p class="blurb">{{ item.blurb }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Diseases</h2>
      <div class="carousel">
        <div
          v-for="(item, index) in diseases"
          :key="index"
          class="edu-card"
          @click="selectItem(item)"
        >
          <img :src="item.img" :alt="item.title" class="edu-img" />
          <div class="edu-info">
            <h4>{{ item.title }}</h4>
            <p class="pron">({{ item.pron }}) <button @click.stop="speak(item.pron)">🎤</button></p>
            <p class="blurb">{{ item.blurb }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Bacteria</h2>
      <div class="carousel">
        <div
          v-for="(item, index) in bacteria"
          :key="index"
          class="edu-card"
          @click="selectItem(item)"
        >
          <img :src="item.img" :alt="item.title" class="edu-img" />
          <div class="edu-info">
            <h4>{{ item.title }}</h4>
            <p class="pron">({{ item.pron }}) <button @click.stop="speak(item.pron)">🎤</button></p>
            <p class="blurb">{{ item.blurb }}</p>
          </div>
        </div>
      </div>
    </section>

    <div v-if="selected" class="overlay" @click="selected = null">
      <img :src="selected.img" class="overlay-img" />
      <div class="overlay-text">
        <h2>{{ selected.title }}</h2>
        <p><strong>Pronunciation:</strong> {{ selected.pron }}</p>
        <p>{{ selected.blurb }}</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EduItem } from '@/types/edu'

// IMAGE IMPORTS (make sure these paths match your project structure)
import imgNa from '@/assets/edu/minerals/sodium.png'
import imgCl from '@/assets/edu/minerals/chloride.png'
import imgMg from '@/assets/edu/minerals/magnesium.png'
import imgCa from '@/assets/edu/minerals/calcium.png'
import imgK from '@/assets/edu/minerals/potassium.png'
import imgSO4 from '@/assets/edu/minerals/sulfate.png'
import imgO2 from '@/assets/edu/minerals/oxygen.png'
import imgCO2 from '@/assets/edu/minerals/carbon-dioxide.png'

import imgEColi from '@/assets/edu/diseases/e-coli.png'
import imgLegionella from '@/assets/edu/diseases/legionella.png'
import imgGiardia from '@/assets/edu/diseases/giardia.png'
import imgCholera from '@/assets/edu/diseases/cholera.png'
import imgSalmonella from '@/assets/edu/diseases/salmonella.png'

import imgSpirillum from '@/assets/edu/bacteria/spirillum.png'
import imgXenophilius from '@/assets/edu/bacteria/xenophilius.png'
import imgMethylobacterium from '@/assets/edu/bacteria/methylobacterium.png'
import imgRhodococcus from '@/assets/edu/bacteria/rhodococcus.png'

const selected = ref<EduItem | null>(null)
const selectItem = (item: EduItem) => (selected.value = item)

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)
  speechSynthesis.speak(utterance)
}

const minerals: EduItem[] = [
  { title: 'Sodium (Na⁺)', pron: 'SO-dee-um', blurb: 'Hi, I’m Sodium! I love to join with Chloride...', img: imgNa },
  { title: 'Chloride (Cl⁻)', pron: 'KLOR-ide', blurb: 'Hello, I’m Chloride! I’m Sodium’s best friend...', img: imgCl },
  { title: 'Magnesium (Mg²⁺)', pron: 'Mag-NEE-zee-um', blurb: 'Hi, I’m Magnesium! I keep the ocean healthy...', img: imgMg },
  { title: 'Calcium (Ca²⁺)', pron: 'KAL-see-um', blurb: 'Hi, I’m Calcium! Shells, corals, and crabs love me...', img: imgCa },
  { title: 'Potassium (K⁺)', pron: 'Puh-TASS-ee-um', blurb: 'Hey, I’m Potassium! I’m also in bananas...', img: imgK },
  { title: 'Sulfate (SO₄²⁻)', pron: 'SUL-fate', blurb: 'Hi, I’m Sulfate! I float around in seawater...', img: imgSO4 },
  { title: 'Oxygen (O₂)', pron: 'OK-si-jen', blurb: 'Hi, I’m Oxygen! Fish and crabs breathe me...', img: imgO2 },
  { title: 'Carbon Dioxide (CO₂)', pron: 'KAR-bun Dye-ox-side', blurb: 'Hello, I’m Carbon Dioxide! Sea plants use me...', img: imgCO2 }
]

const diseases: EduItem[] = [
  { title: 'E. coli', pron: 'Ee KO-lie', blurb: 'I live in tummies. Some naughty kinds can cause tummy aches.', img: imgEColi },
  { title: 'Legionella', pron: 'LEE-juh-nel-uh', blurb: 'I like warm water in hot tubs and pipes.', img: imgLegionella },
  { title: 'Giardia', pron: 'JEE-ar-dee-uh', blurb: 'I live in lakes and cause tummy bugs.', img: imgGiardia },
  { title: 'Cholera', pron: 'KOL-uh-ruh', blurb: 'I sneak into dirty water and cause watery diarrhea.', img: imgCholera },
  { title: 'Salmonella', pron: 'SAL-muh-nel-uh', blurb: 'I hang out on raw food and cause food poisoning.', img: imgSalmonella }
]

const bacteria: EduItem[] = [
  { title: 'Spirillum', pron: 'Spy-RILL-um', blurb: 'I twirl like a corkscrew and live in water.', img: imgSpirillum },
  { title: 'Xenophilius', pron: 'ZEN-oh-fill-us', blurb: 'A recycling helper living in tricky places.', img: imgXenophilius },
  { title: 'Methylobacterium', pron: 'METH-ih-low-bak-TEER-ee-um', blurb: 'Lives on plants and helps them grow.', img: imgMethylobacterium },
  { title: 'Rhodococcus', pron: 'ROW-doe-kok-us', blurb: 'Breaks down oily pollution, cleaning up the environment.', img: imgRhodococcus }
]
</script>

<style scoped>
.education-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.carousel {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 16px 0;
  scroll-snap-type: x mandatory;
}
.edu-card {
  min-width: 280px;
  flex: 0 0 auto;
  background: #f8f8f8;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  scroll-snap-align: start;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.edu-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 12px;
}
.edu-info h4 {
  margin: 0;
}
.pron button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  padding: 20px;
}
.overlay-img {
  width: 200px;
  margin-bottom: 20px;
}
.overlay-text {
  max-width: 600px;
  text-align: center;
}
</style>
