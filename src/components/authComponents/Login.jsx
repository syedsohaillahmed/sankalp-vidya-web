import { Box, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useForm } from "react-hook-form";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../api/axiosHeaders";
import useAxiosDataFunction from "../../hooks/useAxiosDataFunction";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [response, error, loading, loginFunction] = useAxiosFunction();

  const onLoginSubmit = (data) => {
    const data2 = {
      phoneNo: data.email,
      password: data.password,
    };

    loginFunction({
      axiosInstance: axios,
      method: "post",
      url: "/users/login",
      data: data2,
    });
  };

  const [
    allChapterResponse,
    allChapterError,
    allChapterIsLoading,
    fetchAllChapter,
  ] = useAxiosDataFunction();

  // Fetch all chapters
  const getAllChapter = (sid) => {
    console.log("coming inside 22");

    fetchAllChapter({

      axiosInstance: axios,
      method: "get",
      url: `localhost:8000/api/v1/users/student/${sid}`,
      token: "",
    });
  };
  useEffect(() => {
    if (response?.statuscode === 200) {
      if (response?.data?.roleDetails?.roleDisplayName === "Student") {
        console.log("coming inside");
        getAllChapter(123);

      }

      console.log("response", response);
      dispatch(login({ data: response.data }));
    }
  }, [response, error, loading]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, textAlign: "center" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <LockOutlined sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <Box sx={{ mt: 2 }}>
            <TextField
              {...register("email")}
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              {...register("password")}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <Button
              fullWidth
              type="submit"
              // onClick={onLoginSubmit}
              variant="contained"
              color="primary"
              sx={{ mt: 2, py: 1 }}
            >
              Sign In
            </Button>
          </Box>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <a href="#">Sign up</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
