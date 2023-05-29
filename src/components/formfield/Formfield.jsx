import React from "react";
import {
  FieldLabel,
  FormFieldContainer,
  TextInput,
  TextArea,
  ErrorMessage,
} from "./styles";
// A FormField component able to handle both text inputs and textareas. It is Yup + React Hook Form compatible, making it easy to use with the Form component.
const FormField = ({
  name,
  label,
  register,
  errors,
  type,
  inputProps = {},
  placeholder,
}) => {
  const { ...rest } = inputProps;
  const isTextarea = type === "textarea";

  return (
    <FormFieldContainer>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {isTextarea ? (
        <TextArea
          {...register(name)}
          {...rest}
          aria-label={`${name} field`}
          placeholder={placeholder}
        />
      ) : (
        <TextInput
          {...register(name)}
          {...rest}
          aria-label={`${name} field`}
          type={type}
          placeholder={placeholder}
        />
      )}
      {errors[name]?.message && (
        <ErrorMessage>{errors[name].message}</ErrorMessage>
      )}
    </FormFieldContainer>
  );
};

export { FormField };
