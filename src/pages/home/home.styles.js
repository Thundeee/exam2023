import styled from 'styled-components';

const BodyContainer = styled.div`
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20vh;
  transition: background-image 0.5s ease-in-out;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 16px;
`;

export { BodyContainer, ButtonWrapper };