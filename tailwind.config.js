/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#137fec',
        'background-light': '#f6f7f8',
        'background-dark': '#101922',
        error: '#ef4444',
        'error-container': '#991b1b',
        outline: '#334155',
        'on-tertiary-fixed-variant': '#b45309',
        'tertiary-container': '#d97706',
        tertiary: '#f59e0b',
        'electric-blue': '#00D1FF',
        'neon-purple': '#BC13FE',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      fontSize: {
        'headline-lg-mobile': [
          '32px',
          { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '800' },
        ],
        'label-caps': [
          '12px',
          { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '500' },
        ],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'headline-md': [
          '24px',
          { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '700' },
        ],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'headline-lg': [
          '40px',
          { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '800' },
        ],
      },
      spacing: {
        gutter: '1.5rem',
        'stack-md': '1rem',
        'stack-sm': '0.5rem',
        'stack-lg': '2rem',
        'container-max': '640px',
      },
    },
  },
  plugins: [],
};
