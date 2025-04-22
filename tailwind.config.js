
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Outfit: ['Outfit-Regular', 'sans-serif'],
        "Outfit-bold": ["Outfit-Bold", "sans-serif"],
        "Outfit-Medium": ["Outfit-Medium", "sans-serif"],
        "Outfit-semiBold": ["Outfit-SemiBold", "sans-serif"],
      },
      colors: {
        primary: '#030014',
        secondary: '#151213',
        light: {
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
        },
        dark: {
          100: '#000000',
          200: '#000000',
        },
        accent: '#ffffff',
      }
    },
  },
  plugins: [],
}