import { createTheme } from "@mui/material";
import { Salmon, wheat } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA07A',
    },
    secondary: {
      main: '#007BA7',
    },
    info: {
        main: '#F5DEB3',
  },
    },
});

export { theme };