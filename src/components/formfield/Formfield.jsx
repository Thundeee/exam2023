import React from "react";
import {
  FieldLabel,
  FormFieldContainer,
  TextInput,
  TextArea,
  ErrorMessage,
} from "./styles";

const FormField = ({ name, label, register, errors, type, inputProps = {} }) => {
  const { ...rest } = inputProps;
  const isTextarea = type === "textarea";
  return (
    <FormFieldContainer>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {isTextarea ? (
        <TextArea {...register(name)} {...rest} aria-label={`${name} field`} />
      ) : (
        <TextInput {...register(name)} {...rest} aria-label={`${name} field`} type={type} />
      )}
      {errors[name]?.message && (
        <ErrorMessage>{errors[name].message}</ErrorMessage>
      )}
    </FormFieldContainer>
  );
};

export { FormField };