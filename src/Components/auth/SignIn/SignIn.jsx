import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const signInSchema = yup.object({
    email: yup.string().required("Email is required!"),
    password: yup
      .string()

      .required("Password Name is required!"),
  });
  const signInNavigate = useNavigate()
  const signInHandler = (data) => {
    const signInUser = async ()=>{
      const resp = await axios.post("https://api.escuelajs.co/api/v1/auth/login", data);
      console.log(resp);

      if (resp.data.access_token) {
        
        localStorage.setItem("token", resp.data.access_token)
        signInNavigate("/")
      }
    }

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
  console.log(errors, "error");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="border d-flex justify-content-center align-items-center"
    >
      <form onSubmit={handleSubmit((data) => signInHandler(data))}>
        {" "}
        <Box className="">
          <Typography className="fw-bold" variant="h5">
            Sign in to FreshCart
          </Typography>
          <Typography variant="body2">
            Welcome back to FreshCart Enter Your email <br /> to get started{" "}
          </Typography>
          <br />
          <Box>
            <Box>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    error={errors?.email ? true : false}
                    size="small"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                )}
              />

              <Typography className="text-danger" varient="body2">
                {errors?.email?.message}
              </Typography>
            </Box>
            <br />
            <Box>
              <Controller
                className="my-2"
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl fullWidth size="small" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={errors?.password ? true : false}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      {...field}
                    />
                  </FormControl>
                )}
              />

              <Typography variant="body2" className="text-danger fs-6">
                {errors?.password?.message}
              </Typography>
            </Box>
            <br />
            <Button
              type="submit"
              className="bg-success"
              fullWidth
              variant="contained"
            >
              Sign In
            </Button>
            <Typography variant="body2">
              Don't have an Account? <Link to="/Sign-Up">Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default SignIn;
