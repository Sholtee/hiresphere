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
import vFocus from '@/scripts/directives/v-focus.js';

const app = createApp(App)
  .use(router)
  .use(toast, {
    position: 'bottom-right'
  })
  .directive('focus', vFocus);

app.config.globalProperties.$resources = await (await fetch('resources/resources.json')).json();
app.mount('#app');