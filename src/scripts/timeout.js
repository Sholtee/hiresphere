/*
 * File: timeout.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

export default function timeout(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}