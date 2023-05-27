import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  padding-top: 5px;
`;


export const LogoImage = styled.img`
  width: 100px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const Title = styled.h1`
  margin: 0;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

export const ProfileImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
