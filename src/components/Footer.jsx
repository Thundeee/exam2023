import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";

// The footer component that displays the current year and the copyright.
const Footer = () => {
  const theme = useTheme();
  return (
    <footer style={{ backgroundColor: theme.palette.secondary.main }}>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        style={{ padding: " 15px 0", margin: "0" }}
      >
        {" "}
        @ {new Date().getFullYear()} - Holidaze
      </Typography>
    </footer>
  );
};

export default Footer;
