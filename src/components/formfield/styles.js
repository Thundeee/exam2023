import styled from "styled-components";

export const FieldLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

export const FormFieldContainer = styled.div`
  margin-bottom: 1rem;
  min-width: 250px;
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  box-sizing: content-box;
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  resize: none;
  box-sizing: content-box;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;