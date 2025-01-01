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
import registerImg from "./signup-g.svg";
import { Link } from "react-router-dom";
import {  Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object({
  firstName: yup.string().required("First Name is required!"),
  secondName: yup.string().required("Second Name is required!"),
  email: yup.string().required("Email is required!"),
  password: yup.string().min(7, "password must be 7 Char...").max(20).required("Password Name is required!"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      secondName: "",
      email: "",
      password: "",
    },

    resolver: yupResolver(signupSchema),
  });
  console.log(errors, "error");
  return (
    <div className="container">
      <div className="mt-5">
        <Box className="row ">
          <Box className="col-6">
            <img className="img-fluid" src={registerImg} alt="" />
          </Box>
          <Box className="col-5">
            <Typography className="fw-bold" variant="h5">
              Get Start Shopping
            </Typography>
            <Typography variant="body2">
              Welcome back to FreshCart Enter Your email <br /> to get started{" "}
            </Typography>
            <br />
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <Box>
                <Box className="">
                  <Box>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          error={errors?.firstName ? true : false}
                          size="small"
                          type="text"
                          placeholder="First Name"
                          {...field}
                        />
                      )}
                    />
                    <Typography className="text-danger" varient="body2">
                      {errors?.firstName?.message}
                    </Typography>
                  </Box>

                  <Box>
                    <Controller
                      className="my-2"
                      control={control}
                      name="secondName"
                      render={({ field }) => (
                        <TextField
                          error={errors?.secondName ? true : false}
                          fullWidth
                          size="small"
                          type="text"
                          placeholder="Second Name"
                          {...field}
                        />
                      )}
                    />
                    <Typography className="text-danger" varient="body2">
                      {errors?.secondName?.message}
                    </Typography>
                  </Box>
                </Box>

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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
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
                  Register
                </Button>

                <Typography className="my-2 text-center">
                  Do have an Account? <Link to="/Sign-In">Sign In</Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SignUp;
