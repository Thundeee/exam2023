import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Email needs to be valid")
      .required("Please enter your email address."),
    password: yup
      .string()
      .min(3, "Your password must be atleast 3 characters.")
      .required("Please enter your password."),
  })
  .required();

  const registerSchema = yup
  .object({

    username: yup
        .string()
        .min(3, "Your username must be atleast 3 characters.")
        .required("Please enter your username.")
        .matches(/^[a-zA-Z0-9_]+$/i, "Username can only contain letters and numbers."),

    email: yup
      .string()
      .email("Email needs to be valid")
      .required("Please enter your email address."),

      avatar: yup
        .string()
        .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/, "Please enter a valid image url."),

    password: yup
      .string()
      .min(8, "Your password must be atleast 8 characters.")
      .required("Please enter your password."),
  })
  .required();

export { loginSchema, registerSchema };