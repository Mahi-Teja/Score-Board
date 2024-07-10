export const colorPalettes = {
    blue: {
      primary: '#007BFF',
      secondary: '#0056B3',
      accent: '#66B2FF',
      light: '#CCE5FF',
      dark: '#004085',
    },
    green: {
      primary: '#28A745',
      secondary: '#218838',
      accent: '#71DD87',
      light: '#D4EDDA',
      dark: '#155724',
    },
    purple: {
      primary: '#6F42C1',
      secondary: '#5A32A3',
      accent: '#C494F0',
      light: '#E9D6F9',
      dark: '#42296B',
    },
    orange: {
      primary: '#FD7E14',
      secondary: '#E36409',
      accent: '#FFA45B',
      light: '#FFE5D1',
      dark: '#BD4B00',
    },
    gray: {
      primary: '#6C757D',
      secondary: '#495057',
      accent: '#ADB5BD',
      light: '#E9ECEF',
      dark: '#343A40',
    },
  };

  export const themes = {
    blue: {
      background: {
        primary: '#007BFF',
        secondary: '#0056B3',
        accent: '#66B2FF',
        light: '#CCE5FF',
        dark: '#004085',
        default:'bg-blue-500',
      },
      text: 'text-blue-100',
    },
    green: {
      background:{
        primary: '#28A745',
        secondary: '#218838',
        accent: '#71DD87',
        light: '#D4EDDA',
        dark: '#155724',
        default:'bg-green-500',
      },
      text: 'text-green-100',
    },
    purple: {
      background:  {
        primary: '#6F42C1',
        secondary: '#5A32A3',
        accent: '#C494F0',
        light: '#E9D6F9',
        dark: '#42296B',
        default:'bg-purple-500',
      },
      text: 'text-purple-100',
    },
    glass: {
      background: 'bg-white bg-opacity-20 backdrop-blur-md',
      text: 'text-white',
    },
    light: {
      background: 'bg-white',
      text: 'text-black',
    },
    dark: {
      background: 'bg-black',
      text: 'text-white',
    },
  };

  let theme={
    blue:{
        background:{
            primary: '#007BFF',
            secondary: '#0056B3',
            accent: '#66B2FF',
            light: '#CCE5FF',
            dark: '#004085',
        },
        text:{
            primary:'text-white'
        },
    },
    green:{
        background:{
            primary: '#007BFF',
            secondary: '#0056B3',
            accent: '#66B2FF',
            light: '#CCE5FF',
            dark: '#004085',
        },
        text:{
            primary:'text-white'
        },
    },
  }
  const thm = useState(theme)