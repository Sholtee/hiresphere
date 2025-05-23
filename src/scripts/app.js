/*
 * File: app.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {createApp} from 'vue';

import icon from '@/assets/favicon.png';
import App from '@/components/app.vue';
import router from "@/scripts/router.js";

document.querySelector('link[rel="icon"]').href = icon;

createApp(App)
  .use(router)
  .mount('#app');