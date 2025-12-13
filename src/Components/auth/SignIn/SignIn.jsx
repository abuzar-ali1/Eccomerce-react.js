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
  CircularProgress,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import useSignIn from "./useSignIn";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

// Styled Components
const SuccessAlert = styled(Alert)(({ theme }) => ({
  borderRadius: "16px",
  border: `1px solid ${alpha("#4caf50", 0.3)}`,
  background: alpha("#4caf50", 0.1),
  color: "#2e7d32",
  fontWeight: 600,
  "& .MuiAlert-icon": {
    color: "#4caf50",
  },
  animation: "slideIn 0.5s ease",
  "@keyframes slideIn": {
    from: { transform: "translateY(-20px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
}));

const ErrorAlert = styled(Alert)(({ theme }) => ({
  borderRadius: "16px",
  border: `1px solid ${alpha("#f44336", 0.3)}`,
  background: alpha("#f44336", 0.1),
  color: "#d32f2f",
  fontWeight: 600,
  "& .MuiAlert-icon": {
    color: "#f44336",
  },
  animation: "shake 0.5s ease",
  "@keyframes shake": {
    "0%, 100%": { transform: "translateX(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
    "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
  },
}));

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
    loginStatus,
    clearLoginStatus,
  } = useSignIn();

  // Demo credentials for display
  const DEMO_EMAIL = "john@mail.com";
  const DEMO_PASSWORD = "changeme";

  const handleFormSubmit = (data) => {
    signInHandler(data);
  };

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

            {/* Success/Error Messages */}
            {loginStatus.success && (
              <SuccessAlert
                icon={<CheckCircleIcon fontSize="inherit" />}
                severity="success"
                sx={{ mb: 3 }}
              >
                {loginStatus.message}
              </SuccessAlert>
            )}

            {loginStatus.error && (
              <ErrorAlert
                icon={<ErrorIcon fontSize="inherit" />}
                severity="error"
                sx={{ mb: 3 }}
                onClose={clearLoginStatus}
              >
                {loginStatus.message}
              </ErrorAlert>
            )}

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
                Use demo credentials to login:
              </Typography>
              <Typography variant="caption" display="block">
                Email: <strong>{DEMO_EMAIL}</strong>
              </Typography>
              <Typography variant="caption">
                Password: <strong>{DEMO_PASSWORD}</strong>
              </Typography>
            </Alert>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                        disabled={loginStatus.loading}
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
                          disabled={loginStatus.loading}
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
                                disabled={loginStatus.loading}
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
                  disabled={loginStatus.loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: loginStatus.success
                      ? "linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)"
                      : loginStatus.error
                      ? "linear-gradient(45deg, #f44336 30%, #d32f2f 90%)"
                      : "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                    boxShadow: loginStatus.success
                      ? "0 4px 15px rgba(76, 175, 80, 0.4)"
                      : loginStatus.error
                      ? "0 4px 15px rgba(244, 67, 54, 0.4)"
                      : "0 4px 15px rgba(102, 126, 234, 0.4)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: loginStatus.success
                        ? "0 6px 20px rgba(76, 175, 80, 0.6)"
                        : loginStatus.error
                        ? "0 6px 20px rgba(244, 67, 54, 0.6)"
                        : "0 6px 20px rgba(102, 126, 234, 0.6)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                    "&.Mui-disabled": {
                      background: alpha("#667eea", 0.5),
                    },
                  }}
                >
                  {loginStatus.loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : loginStatus.success ? (
                    "✓ Success"
                  ) : loginStatus.error ? (
                    "✗ Invalid"
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.7 }}>
                    New to FreshCart?
                  </Typography>
                </Divider>

                
              </Box>
            </form>

            <Fade in timeout={1000}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 3,
                  color: "text.secondary",
                  opacity: 0.7,
                }}
              >
                Note: This is a demo. Use the provided credentials to test.
              </Typography>
            </Fade>
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