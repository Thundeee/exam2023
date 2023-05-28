import styled from 'styled-components';
import { Box } from "@mui/system";

export const ProfilePicture = styled.img`
width: 100px;
height: 100px;
border-radius: 50%;
cursor: pointer;
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