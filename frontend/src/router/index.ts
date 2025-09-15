import { createRouter, createWebHistory } from 'vue-router'

// Pages from `views` folder
import Home from '../views/Home.vue'
import Education from '../views/Education.vue'
import SwimmingSafety from '../views/SwimmingSafety.vue'
import SevenDaysPrediction from '../views/SevenDaysPrediction.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/education', name: 'Education', component: Education },
  { path: '/safety', name: 'SwimmingSafety', component: SwimmingSafety },
  { path: '/predict', name: 'SevenDaysPrediction', component: SevenDaysPrediction }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
