/*
 * File: app.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {createApp} from 'vue';

import App from '@/components/app.vue';
import router from '@/scripts/router.js';
import toast from '@/scripts/toast.js';

const app = createApp(App)
  .use(router)
  .use(toast, {
    position: 'bottom-right'
  });

app.config.globalProperties.$resources = await (await fetch('/resources/resources.json')).json();
app.mount('#app');