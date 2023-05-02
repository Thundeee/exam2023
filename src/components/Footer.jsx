import { Link } from 'react-router-dom';
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material';


const Footer = ({onToggleDarkMode}) => {
  const theme = useTheme();

    return (
<footer style={{ backgroundColor: theme.palette.secondary.main }}>
<Typography variant="h6" align="center" gutterBottom>
        @ {new Date().getFullYear()} - Holidaze
      </Typography>
        <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/Venue/Create'>VenueCreate</Link>
          </li>
          <li>
            <Link to='/Venue'>Venue</Link>
          </li>
          <li>
            <Link to='/Venue/All'>VenueList</Link>
          </li>
            <li>
            <Link to='/Profile'>Profile</Link>
            </li>
        </ul>
        <button onClick={onToggleDarkMode}>Toggle Dark Mode</button>

      </nav>
</footer>    
);
  };

  export default Footer;