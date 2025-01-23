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
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignIn from "./useSignIn";
const SignIn = () => {
  const {
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
  } = useSignIn();
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
