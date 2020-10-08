const theme = require('tailwindcss/defaultTheme')

/**
 * Tailwind config
 */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...theme.fontFamily.sans],
      },
      colors: {
        black: '#101820',
        red: {
          default: 'rgba(232, 28, 36, 1)',
          darker: 'rgba(184, 20, 27, 1)',
        },
        white: {
          default: 'rgba(244, 244, 233, 1)',
          bright: 'rgba(255, 255, 255, 1)',
        },
        blue: {
          default: 'rgba(70, 121, 133, 1)',
          darker: 'rgba(54, 95, 105, 1)',
        },
      },
      height: {
        ...theme.height,
        128: '30rem',
      },
    },
  },
  plugins: [require('@tailwindcss/ui')],
}