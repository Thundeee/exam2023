import { Link } from 'react-router-dom';


const Header = () => {


    return (
        <header>
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
      </header>
    );
  };

  export default Header;