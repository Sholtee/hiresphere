/*
 * File: app.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {createApp} from 'vue';
import icon from '@/assets/favicon.png';
import App from '@/components/app.vue';

document.querySelector('link[rel="icon"]').href = icon;

const app = createApp(App);
app.mount('#app');