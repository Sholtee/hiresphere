/*
 * File: v-focus.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
export default {
  mounted(el, {value}) {
    if (value)
      el.focus();
  }
};