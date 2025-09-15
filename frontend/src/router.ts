import { createRouter, createWebHistory } from 'vue-router'

// Corrected imports based on actual folder structure
import Home from './views/Home.vue'
import Education from './views/Education.vue'
import SwimmingSafety from './views/SwimmingSafety.vue'
import SevenDaysPrediction from './views/SevenDaysPrediction.vue'
import RecycleQuiz from './views/RecycleQuiz.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/education', name: 'Education', component: Education },
  { path: '/safety', name: 'SwimmingSafety', component: SwimmingSafety },
  { path: '/predict', name: 'SevenDaysPrediction', component: SevenDaysPrediction },
  { path: '/recycle-quiz', name: 'RecyleQuiz', component: RecycleQuiz }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
