import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const useSignIn = () => {
  const signInSchema = yup.object({
    email: yup.string().required("Email is required!"),
    password: yup
      .string()
      .required("Password Name is required!"),
  });
  const signInNavigate = useNavigate();
  const signInHandler = (data) => {
    const signInUser = async () => {
      const resp = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );
      console.log(resp);

      if (resp.data.access_token) {
        localStorage.setItem("token", resp.data.access_token);
        signInNavigate("/");
      }
    };

    signInUser();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: yupResolver(signInSchema),
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    control,
    handleSubmit,
    signInHandler,
    signInSchema,
    yupResolver,
    errors,
  };
};

export default useSignIn;
