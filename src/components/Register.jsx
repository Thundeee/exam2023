import { FormField } from "./formfield/Formfield";
import {useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/yupSchema";
import { Button } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useCallApi from '../hooks/useCallApi';
import {BASE_URL_AUTH} from '../utils/constants';
import { ModalContext } from "../context/modalContent";
import { useContext } from "react";


const Register = (props) => {

  const {setOpenModal, setModalInfo, setModalTitle} = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [manager, setManager] = useState(false);

  const { startFetch, data, isLoading, isError } = useCallApi();

  async function onSubmit(registrationData) {
    
    registrationData.venueManager = manager;
    console.log(registrationData);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    };

    await startFetch(BASE_URL_AUTH + 'register', options);
    console.log(registrationData);

      
    

    if (!isLoading &&!isError) {
      console.log(isError)
      setOpenModal(true);
      setModalTitle('Registration was a success! ');
      setModalInfo('Welcome ' + data.name + ' you can now login!');
      props.children(false)
    }
  }

  return (
    <div>
      <h1>Register!</h1>
      <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          label="Username"
          type="text"
          register={register}
          errors={errors}
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
        />

        <FormField
          name="avatar"
          label="Avatar"
          type="text"
          register={register}
          errors={errors}
        />

        <FormControlLabel control={<Switch onChange={()=>setManager(!manager)} />} label="Are you a Venue manager?" />

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

export default Register;
