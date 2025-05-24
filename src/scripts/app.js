/*
 * File: app.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {createApp} from 'vue';

import App from '@/components/app.vue';
import resources from '@/resources.json' with {type: 'json'};
import router from "@/scripts/router.js";

const app = createApp(App).use(router);
app.config.globalProperties.$resources = resources;
app.mount('#app');