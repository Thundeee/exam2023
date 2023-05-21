import styled from 'styled-components';
import bg from '../../assets/homebg.avif';

const BodyContainer = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20vh;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 16px; /* Added: Sets the spacing between buttons */
`;

export { BodyContainer, ButtonWrapper };