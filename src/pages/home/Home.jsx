import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BodyContainer, ButtonWrapper } from './home.styles';
import { useTheme } from '@mui/material';

//only here for pre-loading the images
//eslint-disable-next-line
import {homeBgDark} from '../../assets/homeBgDark.avif';
//eslint-disable-next-line
import {homeBgLight} from '../../assets/homeBgLight.avif';


const Home = () => {

  const theme = useTheme();
  return (
    <BodyContainer className='App'  style={{  backgroundImage: `url(${theme.palette.background.pic})`}}>
      <ButtonWrapper>
        <Button variant="contained" color="primary" component={Link} to="/Venue/All">
          Explore Venues
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/Venue/Create">
          List your Venue
        </Button>
      </ButtonWrapper>
    </BodyContainer>
  );
};

export default Home;
