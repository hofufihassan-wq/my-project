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
// Keep the existing preview utility surface available to previously saved drafts.
// These classes left application chrome in 5B but remain supported inside previews.
config.safelist = [
  "-bottom-1",
  "-bottom-40",
  "-left-40",
  "-right-1",
  "-right-40",
  "-top-40",
  "-translate-x-1/2",
  "-z-10",
  "bg-[#020420]/75",
  "bg-[#064E3B]/25",
  "bg-[#081022]/90",
  "bg-emerald-950",
  "bg-gradient-to-b",
  "blur-3xl",
  "blur-[120px]",
  "blur-[130px]",
  "border-[#00DC82]/70",
  "border-[#020420]",
  "border-amber-400/30",
  "flex-shrink-0",
  "from-[#00DC82]/15",
  "from-[#064E3B]",
  "gap-3.5",
  "h-11",
  "h-[360px]",
  "hover:border-amber-400",
  "hover:scale-105",
  "left-1/2",
  "lg:flex",
  "lg:hidden",
  "min-h-20",
  "opacity-80",
  "sm:block",
  "sm:flex-nowrap",
  "sm:h-20",
  "sm:inline",
  "sm:py-0",
  "sm:text-2xl",
  "to-[#020420]",
  "to-transparent",
  "via-[#00DC82]/5",
  "w-11",
  "w-96",
  "w-[1100px]"
];
module.exports = config;
