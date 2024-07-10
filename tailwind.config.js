/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    gradiant:'bg-gradient-to-b from-gradiant-start from-10%  via-gradiant-2 via-30% to-90% to-gradiant-end',
    extend: {
      colors:{
        'dominant':'#690299',
        'neutral-1':'#878686',
        'neutral-2':'#936FA5',
        'neutral-2-blur':'#936FA5',
        'neutral-2-light':'#D2B1E1',
        'neutral-3':'#C6C6C6',
        'accent':'#ffffff',
        'text-1':'#FFFFFF',
        'text-2':'#666666',
        'color-main-body':'#754F44',
        'btn-2':'#EAEAEA',
        'btn-1':'#690299',
        'gradiant-end':'#C89EDD',
        'gradiant-start':'#D9d9d9',
        'gradiant-1':'#D9D9D9',
        'gradiant-2':'#B499C1',
        'gradiant-3':'#C89EDD',
        



        'ball-color':'#754F44',

        'target-color':'#754F44',
        'overs-history-color':'#754F4496',
        'nav-color':'#EC7357',
        'button-primary':'#EC7357',
        'controls-color':'#EC7357',
        'score-board-color':'#613A3A',
        'innings-slider-color':'#FBFFB9',
        'controls-bg':'#000F08',
        'current-over':'#4eda82',
        'curr-score':'#4e9ac2',
        'controls-btns':'#4A051C',
        'button-primary-1':'#E1CE7A',
        'color-settings':'#f01efc',
        'gradiant':'bg-gradient-to-br from-purple-200 to-indigo-400',
        blue: {
          primary: '#007BFF',
          secondary: '#0056B3',
          accent: '#66B2FF',
          light: '#CCE5FF',
          dark: '#004085',
        },
        dark:{
          nav:'#2c2b3c',
          body:'#403f4c',
          control:'#1b2432',
          button:'#121420',

        }
      }
      // colors:{
      //   'color-main-body':'#754F44',
      //   'ball-color':'#754F44',

      //   'target-color':'#754F44',
      //   'overs-history-color':'#754F4496',
      //   'nav-color':'#EC7357',
      //   'button-primary':'#EC7357',
      //   'controls-color':'#EC7357',
      //   'score-board-color':'#613A3A',
      //   'innings-slider-color':'#FBFFB9',
      //   'controls-bg':'#000F08',
      //   'current-over':'#4eda82',
      //   'curr-score':'#4e9ac2',
      //   'controls-btns':'#4A051C',
      //   'button-primary-1':'#E1CE7A',
      //   'color-settings':'#f01efc',
      //   'gradiant':'bg-gradient-to-br from-purple-200 to-indigo-400',
      //   blue: {
      //     primary: '#007BFF',
      //     secondary: '#0056B3',
      //     accent: '#66B2FF',
      //     light: '#CCE5FF',
      //     dark: '#004085',
      //   },
      // }
    },

    backgroundImage: {
      'custom-gradient': 'linear-gradient(to right, var(--tw-gradient-from) 10%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 90%)',
    },
  },
  plugins: [],
}