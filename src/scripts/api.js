/*
 * File: api.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import apiDefinition from '@/api.json' with {type: 'json'};

export default class Api extends EventTarget {
  constructor() {
    super();

    Object.entries(apiDefinition).forEach(([key, {method, path}]) => {
      let impl;

      switch (method.toUpperCase()) {
        case 'GET':
          impl = params => {
            let url = path;
            switch (typeof params) {
              case 'undefined':
                break;
              case 'object':
                url += `?${new URLSearchParams(params)}`;
                break;
              default:
                url += `/${encodeURIComponent(params)}`;
                break;
            }
            return this.#fetchWrapper(url);
          };
          break;
        case 'POST':
          impl = params => this.#fetchWrapper(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          });
          break;
        default:
          throw 'Unsupported method';
      }

      this[key] = impl;
    });
  }

  async #fetchWrapper(...args) {
    this.dispatchEvent(new CustomEvent('load', {}));
    try {
      const resp = await fetch(...args);
      if (!resp.ok)
        throw `Unable to fetch the response: "${resp.statusText}"`;

      return await resp.json();
    } catch (error) {
      this.dispatchEvent(new CustomEvent('error', {
        detail: {
          error
        }
      }));
      throw error;
    } finally {
      this.dispatchEvent(new CustomEvent('end-load', {}));
    }
  }
}