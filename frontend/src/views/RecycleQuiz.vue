<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold">
        🛢️ Trash Bin Quiz  <span class="text-success"></span>
      </h2>
      <div>
        <button @click="toggleMute" class="btn btn-outline-secondary me-2">
          <font-awesome-icon :icon="isMuted ? 'volume-mute' : 'volume-up'" /> Sound
        </button>
        <button v-if="quizCompleted" @click="restartQuiz" class="btn btn-outline-primary">Restart</button>
      </div>
    </div>

    <div v-if="!quizCompleted" class="text-center">
      <h4>🗑️ Where does this go?</h4>
      <img :src="currentQuestion.image" :alt="currentQuestion.name" class="quiz-image mb-3" />
      <h3 class="fw-bold">{{ currentQuestion.name }}</h3>
      <p class="text-muted">{{ progressText }}</p>

      <div class="d-flex justify-content-center gap-3 my-3">
        <button
          v-for="bin in bins"
          :key="bin.name"
          :class="['btn', 'bin-btn', bin.class]"
          @click="checkAnswer(bin.label)"
          :disabled="answered"
        >
          {{ bin.emoji }} {{ bin.label }}
        </button>
      </div>

      <div v-if="answered">
        <p :class="isCorrect ? 'text-success' : 'text-danger'" class="fw-bold fs-5">
          {{ isCorrect ? 'Correct!' : 'Oops! Wrong Bin!' }}
        </p>
        <p class="text-info">Fun Fact: {{ currentQuestion.fact }}</p>
        <button @click="nextQuestion" class="btn btn-primary mt-3">Next ➡️</button>
      </div>
    </div>

    <div v-else class="text-center">
      <h3 class="text-success">🎉 Quiz Completed!</h3>
      <p class="fw-bold">You scored {{ score }} out of {{ questions.length }}</p>

      <h5 class="mt-4">Leaderboard 🏆</h5>
      <ul class="list-group leaderboard">
        <li class="list-group-item" v-for="(entry, index) in leaderboard" :key="index">
          {{ index + 1 }}. {{ entry.name }} - {{ entry.score }} pts
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const bins = [
  { label: 'Red Bin', class: 'btn-danger', emoji: '🟥' },
  { label: 'Yellow Bin', class: 'btn-warning', emoji: '🟨' },
  { label: 'Green Bin', class: 'btn-success', emoji: '🟩' }
];

const questions = ref([
  {
    name: 'Plastic Bottle',
    bin: 'Yellow Bin',
    image: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
    fact: 'Plastic bottles can be recycled into clothes or furniture!'
  },
  {
    name: 'Banana Peel',
    bin: 'Green Bin',
    image: 'https://cdn-icons-png.flaticon.com/512/766/766512.png',
    fact: 'Banana peels are great for compost!'
  },
  {
    name: 'Pizza Box (Greasy)',
    bin: 'Red Bin',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046849.png',
    fact: 'Greasy boxes cannot be recycled!'
  },
  {
    name: 'Newspaper',
    bin: 'Yellow Bin',
    image: 'https://cdn-icons-png.flaticon.com/512/337/337940.png',
    fact: 'Paper is recyclable unless it\'s soiled!'
  },
  {
    name: 'Chicken Bones',
    bin: 'Red Bin',
    image: 'https://cdn-icons-png.flaticon.com/512/2803/2803048.png',
    fact: 'Bones are not compostable in green bins!'
  },
  {
    name: 'Aluminium Can',
    bin: 'Yellow Bin',
    image: 'https://cdn-icons-png.flaticon.com/512/1046/1046856.png',
    fact: 'Cans are 100% recyclable and reusable!'
  }
]);

const currentIndex = ref(0);
const score = ref(0);
const answered = ref(false);
const isCorrect = ref(false);
const quizCompleted = ref(false);
const isMuted = ref(false);

const correctSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_170394ac82.mp3');
const wrongSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_5c9f3f1f2d.mp3');
const bgMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_65d5d1f17d.mp3');
bgMusic.loop = true;

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const progressText = computed(() => `Question ${currentIndex.value + 1} of ${questions.value.length}`);
const leaderboard = ref([]);

function checkAnswer(bin) {
  answered.value = true;
  isCorrect.value = bin === currentQuestion.value.bin;
  if (isCorrect.value) {
    score.value++;
    if (!isMuted.value) correctSound.play();
  } else {
    if (!isMuted.value) wrongSound.play();
  }
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    answered.value = false;
  } else {
    completeQuiz();
  }
}

function completeQuiz() {
  quizCompleted.value = true;
  const name = prompt('Enter your name for the leaderboard:') || 'Player';
  const entry = { name, score: score.value };
  const existing = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  existing.push(entry);
  existing.sort((a, b) => b.score - a.score);
  leaderboard.value = existing.slice(0, 5);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard.value));
}

function restartQuiz() {
  questions.value = shuffleArray(questions.value);
  currentIndex.value = 0;
  score.value = 0;
  answered.value = false;
  isCorrect.value = false;
  quizCompleted.value = false;
}

function toggleMute() {
  isMuted.value = !isMuted.value;
  if (isMuted.value) {
    bgMusic.pause();
  } else {
    bgMusic.play();
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

onMounted(() => {
  questions.value = shuffleArray(questions.value);
  leaderboard.value = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  if (!isMuted.value) bgMusic.play();
});
</script>

<style scoped>
.quiz-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
}
.bin-btn {
  min-width: 120px;
  font-size: 18px;
  padding: 10px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.leaderboard {
  max-width: 300px;
  margin: 0 auto;
  text-align: left;
}
</style>
