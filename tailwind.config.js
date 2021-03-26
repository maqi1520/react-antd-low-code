module.exports = {
  purge: ['src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        blue: ['2px solid #0000ff', '-1px'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
