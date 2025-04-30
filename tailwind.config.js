import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: { fontSize: theme("fontSize.4xl") },
            h2: { fontSize: theme("fontSize.3xl") },
            h3: { fontSize: theme("fontSize.2xl") },
            h4: { fontSize: theme("fontSize.xl") },
            h5: { fontSize: theme("fontSize.lg") },
            h6: { fontSize: theme("fontSize.base") },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

