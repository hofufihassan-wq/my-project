const config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              400: '#34d399',
              500: '#00DC82',
              600: '#00b86b',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
            },
            nuxt: {
              DEFAULT: '#00DC82',
              hover: '#00b86b',
              dark: '#064E3B',
              border: '#1e332c',
              bg: '#020420',
              surface: '#081022',
              card: '#0F172A',
              cardHover: '#131F37',
            }
          },
          fontFamily: {
            arabic: ['"Alexandria"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          boxShadow: {
            'nuxt-glow': '0 0 30px -5px rgba(0, 220, 130, 0.25)',
            'nuxt-glow-lg': '0 0 50px -5px rgba(0, 220, 130, 0.35)',
            'card-glow': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(0, 220, 130, 0.15)',
          }
        }
      }
    };
config.content = ["./index.html", "./app.js", "./lexicon-data.js", "./practice-curriculum.js", "./simulator-guides.js"];
module.exports = config;
