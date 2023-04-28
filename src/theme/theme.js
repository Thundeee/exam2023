import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#005573',
    },
    secondary: {
      main: '#F5DEB3',
    },
    background: {
      default: '#F0F0F0',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4AB3D7',
    },
    secondary: {
      main: '#F5DEB3',
    },
    background: {
      default: '#1E1E1E',
    },
  },
});

export { lightTheme, darkTheme };