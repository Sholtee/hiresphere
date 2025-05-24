/*
 * File: app.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {createApp} from 'vue';

import icon from '@/assets/favicon.png';
import App from '@/components/app.vue';
import resources from '@/resources.json' with {type: 'json'};
import router from "@/scripts/router.js";

document.querySelector('link[rel="icon"]').href = icon;

const app = createApp(App).use(router);
app.config.globalProperties.$resources = resources;
app.mount('#app');