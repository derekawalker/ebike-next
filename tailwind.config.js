const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js', './styles/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Lato', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      height: {
        vh40: '40vh',
        vh50: '50vh',
        vh60: '60vh',
        vh70: '70vh',
        vh80: '80vh',
      },
    },
  },
};
