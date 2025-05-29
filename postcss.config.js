/*
 * File: postcss.config.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {purgeCSSPlugin} from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    autoprefixer,
    purgeCSSPlugin({
      content: ['./index.html', './src/**/*.{js,vue}'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
};