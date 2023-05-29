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
import { ModalContext } from "../context/modalContent";
import defaultPfp from '../assets/defaultPfp.png';


const Login = (props) => {
  
  const {setOpenModal, setModalInfo, setModalTitle} = useContext(ModalContext);

  const {setToken } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', '')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  
  
  const { startFetch, information, isItLoading, isItError } = useCallApi();

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
    if (information && !isItLoading && !isItError) {
      if (!information.avatar) {
        information.avatar = defaultPfp;

      }

      setToken(true);
      setUserInfo(information);
      setOpenModal(true);
      setModalTitle('Success!');
      setModalInfo('Welcome ' + information.name);
      props.children(false)
    }
    // eslint-disable-next-line
  }, [information, isItLoading, isItError]);
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