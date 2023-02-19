/**
 * This is a configuration object for the Tailwind CSS framework, which allows you
 * to specify various settings for the styles used in your application.
 */
module.exports = {
  // The 'future' property enables or disables experimental features in Tailwind.
  future: {
    hoverOnlyWhenSupported: true,
  },

  // The 'content' property specifies where to look for files to process.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],

  // The 'theme' property lets you define custom values for colors, fonts, etc.
  theme: {
    // The 'extend' property allows you to add new styles or modify existing ones.
    extend: {
      // The 'animation' property defines custom animations.
      animation: {
        scale: "scale 0.5s ease-in-out infinite alternate",
        rotate: "rotate 2s linear infinite",
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spinner: "spinner 1s linear infinite",
        blink: "blink 1.4s linear infinite",
      },
      // The 'keyframes' property defines custom keyframes for animations.
      keyframes: {
        scale: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: 0.2 },
          "20%": { opacity: 1 },
        },
      },
    },
  },

  // The 'plugins' property specifies which plugins to load for Tailwind.
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
