import styled from "styled-components";

export const BoxContainer = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  flex: 1;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export const RowContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const FieldContainer = styled.div`
  flex: 1;
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const PreviewContainer = styled.div`
  align-self: center;
  flex: 1;
  border-radius: 32px;
  padding: 16px;
  margin-bottom: 16px;
  margin-right: 32px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${(props) => props.backgroundColor};
  color: black;
  word-wrap: break-word;

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