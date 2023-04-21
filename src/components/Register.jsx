import { FormField } from "./formfield/Formfield";
import {React, useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/yupSchema";
import { Button } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useApi from '../hooks/useApi';
import {BASE_URL_AUTH} from '../utils/constants';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [manager, setManager] = useState(false);

  function toggler() {
    setManager(!manager);
  }

  async function onSubmit(data) {
    console.log("dwx");
    data.venueManager = manager;
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(BASE_URL_AUTH + 'register', options)
      .then(async (response) => {
        console.log(response);
        const json = await response.json();
        console.log(json);
      }
      )
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

        <FormControlLabel control={<Switch onChange={toggler} />} label="Are you a Venue manager?" />

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
