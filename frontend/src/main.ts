import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// PrimeVue imports
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Divider from 'primevue/divider';
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';
import Carousel from 'primevue/carousel';
import 'primeicons/primeicons.css';

const app = createApp(App);

// Register PrimeVue components globally
app.component('Button', Button);
app.component('Card', Card);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Message', Message);
app.component('Divider', Divider);
app.component('Toolbar', Toolbar);
app.component('Avatar', Avatar);
app.component('Carousel', Carousel);

// Configure PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: 'aura',
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
});

app.use(router);
app.mount('#app');