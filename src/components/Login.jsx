import { FormField } from "./formfield/Formfield";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/yupSchema";
import { Button } from "@mui/material";
import {BASE_URL_AUTH} from '../utils/constants';
import useLocalStorage from "../hooks/useLocalStorage";





const Login = () => {
   
  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
    // eslint-disable-next-line no-unused-vars
  const [name, setName] = useLocalStorage('username', '');
    // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useLocalStorage('avatar', '');
    // eslint-disable-next-line no-unused-vars
  const [venueManager, setVenueManager] = useLocalStorage('venueManager', '');

  
  
  const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(loginSchema),
      });

      async function onSubmit(data) {
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
    
        fetch(BASE_URL_AUTH + 'login', options)
          .then(async (response) => {
            console.log(response);
            const json = await response.json();
            console.log(json);
           await setAccessToken(json.accessToken); 
           await setName(json.name);
            if (json.avatar) {
            await  setAvatar(json.avatar); 
            }
            if (json.venueManager) {
           await   setVenueManager(json.venueManager);
            }
            window.location.reload();
          }
          )
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