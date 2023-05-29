import styled from 'styled-components';
import { Box } from "@mui/system";

export const ProfilePicture = styled.img`
width: 200px;
height: 200px;
border-radius: 50%;
cursor: pointer;
object-fit: cover;
margin-top: 20px;
@media (max-width: 728px) {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
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

export const StyledImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 1px solid black;
  @media (max-width: 728px) {
    width: 100px !important;
    height: 100px !important;
  }

`;