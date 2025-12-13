import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const navigate = useNavigate();

  const signInSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required!"),
    password: yup.string().required("Password is required!"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const clearLoginStatus = () => {
    setLoginStatus({
      loading: false,
      success: false,
      error: false,
      message: "",
    });
  };

  const signInHandler = async (data) => {
    // Clear previous status
    setLoginStatus({
      loading: true,
      success: false,
      error: false,
      message: "Authenticating...",
    });

    try {
      const resp = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );

      if (resp.data.access_token) {
        // Set token in localStorage
        localStorage.setItem("token", resp.data.access_token);
        
        // Set success status
        setLoginStatus({
          loading: false,
          success: true,
          error: false,
          message: "Login successful! Redirecting...",
        });

      
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.response) {
       
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.response.status === 400) {
          errorMessage = "Invalid request. Please check your inputs.";
        } else if (error.response.status === 404) {
          errorMessage = "User not found. Please check your credentials.";
        } else {
          errorMessage = `Server error (${error.response.status}). Please try again later.`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "Network error. Please check your connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || "An unexpected error occurred.";
      }

      // Reset form on error
      reset();

      // Set error status
      setLoginStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage,
      });

      // Clear error after 5 second
      setTimeout(() => {
        clearLoginStatus();
      }, 5000);
    }
  };

  const fillDemoCredentials = () => {
    const demoEmail = "john@mail.com";
    const demoPassword = "changeme";
    return { email: demoEmail, password: demoPassword };
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
    loginStatus,
    clearLoginStatus,
    fillDemoCredentials,
  };
};

export default useSignIn;