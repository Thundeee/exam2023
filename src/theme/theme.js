import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFA07A',
    },
    secondary: {
      main: '#005573',
    },
  terrtiary: {
      main: '#F5DEB3',
  },
    background: {
      default: '#ECEFF1',
      paper: '#ECEFF1',
    },
    text: {
      primary: '#000000',
    }
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#FFA07A',
    },
    secondary: {
      main: '#005573',
    },

    terrtiary: {
      main: '#00a8d6',
    },

    background: {
      default: '#393939',
      paper: '#393939',
    },
    text: {
      primary: '#ffffff',
    }
  },
});

export { lightTheme, darkTheme };