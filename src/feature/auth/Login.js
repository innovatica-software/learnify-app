import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserLogin,
  errorClean,
} from "../../state/reducers/auth/authSlice";
import { showErrorToast, showSuccessToast } from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";
import { theme } from "./../../Theme/AppTheme";

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, errorMessage, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const email = data.get("email");
    dispatch(createUserLogin({ email, password }));
  };
  React.useEffect(() => {
    if (isAuthenticated) {
      showSuccessToast("Successfully Logged In");
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 50);
      return () => {
        clearTimeout(redirectTimer);
      };
    }
    if (errorMessage) {
      const timer = setTimeout(() => {
        showErrorToast(errorMessage);
        dispatch(errorClean());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAuthenticated, dispatch, navigate, errorMessage]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: "80vh",
          marginTop: { xs: 4, sm: 4, md: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading || isAuthenticated ? (
          <Loader />
        ) : (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 1,
                padding: 2,
                "& > *": { my: 2 },
                maxWidth: 600,
                mx: "auto",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: `${theme.buttonColor}`,
                  }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      Don't have an account?{" "}
                      <span className="text-blue-500 ">Sign Up</span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}
