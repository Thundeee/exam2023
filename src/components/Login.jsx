import { FormField } from "./formfield/Formfield";
import {useEffect, useContext} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/yupSchema";
import { Button } from "@mui/material";
import {BASE_URL_AUTH} from '../utils/constants';
import useLocalStorage from "../hooks/useLocalStorage";
import useCallApi from "../hooks/useCallApi";
import { AuthContext } from "../context/auth";


const Login = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
    // eslint-disable-next-line no-unused-vars
  const { token, setToken } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', '')
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

  
  
  const { startFetch, data, isLoading, isError } = useCallApi();

  async function onSubmit(userData) {
    console.log(userData);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    await startFetch(BASE_URL_AUTH + 'login', options);
  }


  useEffect(() => {
    if (data) {
      setToken(true);
      setUserInfo(data);
      console.log(data);
      props.children(false)
    }
  }, [data]);
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