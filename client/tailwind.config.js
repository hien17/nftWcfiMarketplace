/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      'Ag': ['Ag', 'sans-serif']
    },
    extend: {
      height:{
        '1136px':'1136px', //1136px IntroduceImage
      },
      width: {
        '740px':'740px', //740px IntroduceImage
      },
      left:{
        '972px':'972px', //972px IntroduceImage
      },
      top: {
        '228px':'228px', //228px IntroduceImage
      },
      right:{
        '132px':'132px', //132px IntroduceImage
      },
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
