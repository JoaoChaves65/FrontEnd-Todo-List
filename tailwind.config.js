/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos do React
  ],
  theme: {
      extend: {
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          card: 'hsl(var(--card))',
          'card-foreground': 'hsl(var(--card-foreground))',
          primary: 'hsl(var(--primary))',
          'primary-foreground': 'hsl(var(--primary-foreground))',
        },
      }
  },
  plugins: [],
};
