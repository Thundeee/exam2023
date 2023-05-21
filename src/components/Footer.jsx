import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/themeSelect";

const Footer = () => {
  const theme = useTheme();

  const { toggleDarkMode } = useContext(ThemeContext);

  return (
    <footer style={{ backgroundColor: theme.palette.secondary.main }}>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        style={{ paddingTop: "20px" }}
      >
        {" "}
        @ {new Date().getFullYear()} - Holidaze
      </Typography>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </footer>
  );
};

export default Footer;
