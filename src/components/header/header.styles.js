import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 5px;
`;

export const Title = styled.h1`
  flex: 1;
  text-align: center;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

