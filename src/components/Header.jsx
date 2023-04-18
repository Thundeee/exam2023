import { Link } from 'react-router-dom';
import Logo from '../Logo.svg';
import useApi from '../hooks/useApi';


const Header = () => {


    return (
        <header>

          <img src={Logo} alt="Holidaze Logo" />
            <h1>Holidaze</h1>
            <button>Sign up</button>
            <button>Log in</button>
      </header>
    );
  };

  export default Header;