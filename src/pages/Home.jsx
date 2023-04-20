import logo from '../Logo.svg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Home =  () => {
  
    return (

<div className="App">
<h1>Holidaze</h1>
<Button variant="contained" color="primary" component={Link} to="/Venue/All">Explore Venues</Button>
<Button variant="contained" color="primary" component={Link} to="/Venue/Create">List your Venue</Button>

</div>
    );
  };
  
  export default Home;