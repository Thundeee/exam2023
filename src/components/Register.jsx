import { FormField } from "./formfield/Formfield";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/yupSchema";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useCallApi from "../hooks/useCallApi";
import { BASE_URL_AUTH } from "../utils/constants";
import { ModalContext } from "../context/modalContent";
import { useContext } from "react";

// The Register component that allows users to register to the website via a drawer.
const Register = (props) => {
  const { setOpenModal, setModalInfo, setModalTitle } =
    useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [manager, setManager] = useState(false);

  const { startFetch, information, isItLoading, isItError } = useCallApi();

  async function onSubmit(registrationData) {
    registrationData.venueManager = manager;
    console.log(registrationData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    };

    await startFetch(BASE_URL_AUTH + "register", options);
    console.log(registrationData);
  }

  //useEffect to check if the user has registered successfully.
  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      setOpenModal(true);
      setModalTitle("Registration was a success!");
      setModalInfo("Welcome " + information.name + " you can now login!");
      props.children(false);
    }
    // eslint-disable-next-line
  }, [information, isItLoading, isItError]);
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

        <FormControlLabel
          control={<Switch onChange={() => setManager(!manager)} />}
          label="Are you a Venue manager?"
        />

        <FormField
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
