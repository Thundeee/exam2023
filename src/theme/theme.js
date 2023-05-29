import { createTheme } from "@mui/material";
import bgDark from "../assets/homeBgDark.avif";
import bgLight from "../assets/homeBgLight.avif";

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FFA07A",
    },
    secondary: {
      main: "#005573",
    },
    tertiary: {
      main: "#F5DEB3",
    },
    background: {
      default: "#ECEFF1",
      paper: "#ECEFF1",
      pic: bgLight,
    },
    text: {
      primary: "#000000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FFA07A",
    },
    secondary: {
      main: "#005573",
    },

    tertiary: {
      main: "#00a8d6",
    },

    background: {
      default: "#393939",
      paper: "#393939",
      pic: bgDark,
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export { lightTheme, darkTheme };
