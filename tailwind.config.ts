import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#111119',
        'dark-blue': '#0c2e45',
        'light-blue': '#245c74',
        'olive': '#7a9842',
        'dark-green': '#284241'
      }
    },
  },
  plugins: [],
}
export default config
