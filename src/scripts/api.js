/*
 * File: api.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import apiDefinition from '@/api.json' with {type: 'json'};

export default function Api(loaderVisible) {
  Object.entries(apiDefinition).forEach(([key, {method, path}]) => {
    let impl;

    switch (method.toUpperCase()) {
      case 'GET':
        impl = params => {
          // path is captured so do not modify it
          let url = path;
          if (typeof params === 'object')
            url += `?${new URLSearchParams(params)}`;
          return fetchWrapper(url);
        };
        break;
      case 'POST':
        impl = params => fetchWrapper(path, {
          method: 'POST',
          body: JSON.stringify(params)
        });
        break;
      default:
        throw 'Unsupported method';
    }

    this[key] = impl;
  });

  async function fetchWrapper(...args) {
    // api calls might run parallel -> do not use bool
    loaderVisible.value++;
    try {
      const resp = await fetch(...args);
      return await resp.json();
    } catch (err) {
      alert(err.toString());
    } finally {
      loaderVisible.value--;
    }
  }
}