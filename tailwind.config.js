/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. CULORILE PREMIUM (LUXURY BAKERY)
      colors: {
        brand: {
          magenta: "#e91e63",    // Culoarea ta principală (Punctul de accent)
          dark: "#2D2A26",       // Antracit/Ciocolată (pentru textul de lux)
          light: "#FAF7F2",      // Fundalul crem/off-white
          teal: "#0d9488",       // Pentru accentele din logo (dacă le păstrezi)
        },
        pastel: {
          rose: "#FFB6C1",       // Roz prăjitură
          pink: "#FFF0F5",
          cream: "#FFFDD0",
          blue: "#E0F2FE",
          purple: "#F3E8FF",
        }
      },

      // 2. FONTURILE (Sincronizate cu ce am pus în index.html)
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],    // Pentru titluri editoriale
        sans: ['Montserrat', 'sans-serif'],        // Pentru text curat și butoane
        script: ['Great Vibes', 'cursive'],        // Pentru accentele "de mână"
      },

      // 3. DIMENSIUNI PERSONALIZATE (Pentru a elimina erorile din VS Code)
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      zIndex: {
        '100': '100',
        '110': '110',
      },
      spacing: {
        '125': '31.25rem', // Echivalentul a 500px (pentru glow-urile din spate)
      },
      minWidth: {
        '75': '18.75rem',  // Echivalentul a 300px (pentru calendar/modale)
        '30': '7.5rem',    // Echivalentul a 120px
      },
      
      // 4. ANIMAȚII EXTRA (Pentru feeling-ul boutique)
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}