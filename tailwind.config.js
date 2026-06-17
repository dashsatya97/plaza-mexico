/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#C62828",
          600: "#a11c1c",
          700: "#7f1515",
          800: "#5c0e0e",
          900: "#3b0808",
        },
        secondary: {
          50: "#fffde7",
          100: "#fff9c4",
          200: "#fff59d",
          300: "#fff176",
          400: "#ffee58",
          500: "#F9A825",
          600: "#c4861e",
          700: "#8d6115",
          800: "#563c0d",
          900: "#201805",
        },
        accent: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ff9800",
          600: "#fb8c00",
          700: "#f57c00",
          800: "#e65100",
          900: "#bf360c",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "page-enter": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out both",
        "zoom-in": "zoom-in 0.3s ease-in-out both",
        "fade-in-up": "fade-in-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in-down": "fade-in-down 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-right": "slide-in-right 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "page-enter": "page-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ken-burns": "ken-burns 22s ease-out forwards",
      },
    },
  },
  plugins: [],
};
