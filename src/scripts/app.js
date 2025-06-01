/*
 * File: app.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import {createApp} from 'vue';

import api from "@/scripts/api.js";
import App from '@/components/app.vue';
import router from '@/scripts/router.js';
import toast from '@/scripts/toast.js';

const app = createApp(App)
  .use(router)
  .use(toast, {
    position: 'bottom-right'
  });

Object.assign(app.config.globalProperties, {
  $api: api,
  $resources: await (await fetch('/resources/resources.json')).json()
});

app.mount('#app');