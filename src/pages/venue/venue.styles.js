import styled from 'styled-components';
import { Container } from '@mui/material';

export const VenueContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const VenueName = styled.h1`
  text-align: center;
`;

export const VenueContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
`;

export const VenueMetaWrapper = styled.div`
  margin-top: 20px;
`;

export const VenueBookingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const VenueBookingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const VenueButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
