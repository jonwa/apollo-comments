/* eslint-disable */
const path = require('path');

module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'custom-media-queries': {
          preserve: false,
          importFrom: 'src/styles/foundation/media.css',
        },
        'custom-properties': {
          preserve: true,
          importFrom: 'src/styles/foundation/colors.css',
        },
        'color-mod-function': {},
      }
    },
  },
};
