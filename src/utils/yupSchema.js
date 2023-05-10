import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Email needs to be valid")
      .matches(/^[a-zA-Z0-9_.+-]+@(stud\.)?noroff\.no$/gmi, "Email must be a valid noroff email.")
      .required("Please enter your email address."),
    password: yup
      .string()
      .min(3, "Your password must be atleast 3 characters.")
      .required("Please enter your password."),
  })
  .required();

  const registerSchema = yup
  .object({

    name: yup
        .string()
        .min(3, "Your username must be atleast 3 characters.")
        .required("Please enter your username.")
        .matches(/^[a-zA-Z0-9_]+$/i, "Username can only contain letters and numbers."),

    email: yup
      .string()
      .email("Email needs to be valid")
        .matches(/^[a-zA-Z0-9_.+-]+@(stud\.)?noroff\.no$/gmi, "Email must be a valid noroff email.")
      .required("Please enter your email address."),

      avatar: yup
        .string()
        .matches(/(^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$)|(^$)/, "Please enter a valid image url."),
        

    password: yup
      .string()
      .min(8, "Your password must be atleast 8 characters.")
      .required("Please enter your password."),
  })

  const venueSchema = yup
  .object({

    name: yup
        .string()
        .min(3, "Your venue name must be atleast 3 characters.")
        .required("Please enter a name for your venue."),
    description: yup
      .string()
      .min(3, "Your description must be atleast 3 characters.")
      .required("Please describe your venue."),

      media: yup
        .string()
        .matches(/(^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$)|(^$)/, "Please enter a valid image url."),
        

      price: yup
      .number()
      .typeError('Price must be a number.')
      .required("Please enter price per night."),

        
      maxGuests: yup
      .number()
      .required("Please enter maximum guests at your venue.")
      .max(100, 'Maximum guests can not be more than 100.')
      .typeError('Maximum guests must be a number.'),

      
      address: yup
      .string(),

      city: yup
      .string(),

      zip: yup
      .string(),
      

      country: yup
      .string(),

  })

export { loginSchema, registerSchema, venueSchema };