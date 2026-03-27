/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#f6f3ee',
          ink: '#1c1917',
          muted: '#78716c',
          line: '#e7e5e4',
          accent: '#b45309',
          accenthover: '#92400e',
          surface: '#ffffff',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-header':
          'radial-gradient(1200px 480px at 10% -20%, rgba(180, 83, 9, 0.12), transparent 55%), radial-gradient(900px 400px at 90% 0%, rgba(28, 25, 23, 0.06), transparent 50%)',
      },
    },
  },
  plugins: [],
}
