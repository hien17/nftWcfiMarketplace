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
      colors:{
      },
      margin:{
        '152px':'152px', //152px margin top homebody
        '302px':'302px',
        '300px':'300px',
        '180px':'180px',
      },
      padding:{
        '152px':'152px', 
        '302px':'302px',
        '300px':'300px',
        '180px':'180px',
      },
      height:{
        '1136px':'1136px', //1136px IntroduceImage
        '1312px':'1312px', //1312px HomeBody
        '1962px':'1962px', //1962px
        '194px':'194px', //194px
        '376px':'376px', //376px
        '610px':'610px', //
        '316px':'316px', //316px
      },
      width: {
        '740px':'740px', //740px IntroduceImage
        '1134px':'1134px', //1134px HomeBody
        '464px':'464px', //464px HomeBody
        '1638px':'1638px', //1638 HomeBody
        '834':'834', //834 HomeBody
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
