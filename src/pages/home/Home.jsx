import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BodyContainer, ButtonWrapper } from './home.styles';

const Home = () => {
  return (
    <BodyContainer>
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
