import styled from 'styled-components';
import { Box } from "@mui/system";

export const ProfilePicture = styled.img`
width: 200px;
height: 200px;
border-radius: 50%;
cursor: pointer;
object-fit: cover;
margin-top: 20px;
margin-left: 20px;
`;

export const VenueWrapper = styled(Box)`
  border-radius: 32px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${(props) => props.backgroundColor};
  color: black;
  inline-size: fit-content;
  min-width: 100%;
  margin : 5% auto;
`;

export const VenueInfoWrapper = styled.div`
  margin-right: 1rem;
`;

export const VenueImageWrapper = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;