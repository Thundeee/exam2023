import { Link } from 'react-router-dom';
import { Typography } from "@mui/material";



const Footer = () => {


    return (
<footer>
<Typography variant="h6" align="center" gutterBottom>
        @ {new Date().getFullYear()} - Holidaze
      </Typography>
        <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/VenueCreate'>VenueCreate</Link>
          </li>
          <li>
            <Link to='/Venue'>Venue</Link>
          </li>
          <li>
            <Link to='/VenueList'>VenueList</Link>
          </li>
            <li>
            <Link to='/Profile'>Profile</Link>
            </li>
        </ul>

      </nav>
</footer>    
);
  };

  export default Footer;