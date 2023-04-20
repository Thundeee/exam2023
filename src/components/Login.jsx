import { FormField } from "./formfield/Formfield";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/yupSchema";
import { Button } from "@mui/material";






const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(loginSchema),
      });

      function onSubmit(data) {
        console.log(data);
    
      } 
    
  

    return (
<div>
<h1>Log in!</h1>
      <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
            type="email"
          register={register}
          errors={errors}
        />

        <FormField
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
        />
        <Button type="submit" variant="contained" color="primary">
            Submit
            </Button>

        </form>

</div> 
);
  };

  export default Login;