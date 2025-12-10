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
  Paper,
  Fade,
  Zoom,
  Alert,
  Divider,
  alpha,
} from "@mui/material";
import { Controller } from "react-hook-form";
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
    errors,
  } = useSignIn();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: alpha("#fff", 0.1),
          top: "-100px",
          right: "-100px",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: alpha("#fff", 0.05),
          bottom: "-50px",
          left: "-50px",
        },
      }}
    >
      <Fade in timeout={500}>
        <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: "400px" }, zIndex: 1 }}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transform: "translateY(0)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Zoom in timeout={600}>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.75rem", sm: "2rem" },
                    background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  Welcome Back!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", opacity: 0.8 }}
                >
                  Sign in to your FreshCart account
                </Typography>
              </Box>
            </Zoom>

            <Alert 
              severity="info" 
              sx={{
                mb: 3,
                borderRadius: 2,
                bgcolor: alpha("#2196f3", 0.1),
                border: `1px solid ${alpha("#2196f3", 0.2)}`,
                "& .MuiAlert-icon": {
                  color: "#1976d2",
                },
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { boxShadow: `0 0 0 0 ${alpha("#2196f3", 0.4)}` },
                  "70%": { boxShadow: `0 0 0 10px ${alpha("#2196f3", 0)}` },
                  "100%": { boxShadow: `0 0 0 0 ${alpha("#2196f3", 0)}` },
                },
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Use demo credentials:
              </Typography>
              <Typography variant="caption">
                Email: <strong>john@mail.com</strong>
              </Typography>
              <br />
              <Typography variant="caption">
                Password: <strong>changeme</strong>
              </Typography>
            </Alert>

            <form onSubmit={handleSubmit(signInHandler)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        error={!!errors?.email}
                        size="medium"
                        type="email"
                        label="Email Address"
                        placeholder="john@mail.com"
                        {...field}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: 2,
                              },
                            },
                            "&.Mui-focused": {
                              transform: "translateY(-2px)",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: 2,
                                boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
                              },
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {errors?.email && (
                    <Fade in>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "error.main",
                          mt: 0.5,
                          ml: 1.5,
                          display: "block",
                          fontWeight: 500,
                        }}
                      >
                        {errors.email.message}
                      </Typography>
                    </Fade>
                  )}
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormControl fullWidth size="medium" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          error={!!errors?.password}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          placeholder="changeme"
                          {...field}
                          sx={{
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: 2,
                              },
                            },
                            "&.Mui-focused": {
                              transform: "translateY(-2px)",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: 2,
                                boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
                              },
                            },
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                sx={{
                                  color: "primary.main",
                                  "&:hover": {
                                    bgcolor: alpha("#667eea", 0.1),
                                  },
                                }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    )}
                  />
                  {errors?.password && (
                    <Fade in>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "error.main",
                          mt: 0.5,
                          ml: 1.5,
                          display: "block",
                          fontWeight: 500,
                        }}
                      >
                        {errors.password.message}
                      </Typography>
                    </Fade>
                  )}
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  Sign In
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.7 }}>
                    New to FreshCart?
                  </Typography>
                </Divider>

              </Box>
            </form>
          </Paper>

          <Fade in timeout={1000}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 3,
                color: "white",
                opacity: 0.8,
              }}
            >
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </Typography>
          </Fade>
        </Box>
      </Fade>
    </Box>
  );
};

export default SignIn;