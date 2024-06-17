import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../../CommonComponent/Layout';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../CommonComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, RegLog } from '../../Redux/Slice/AuthSlice';


const defaultTheme = createTheme();

const LogIn=()=> {
  const navigate=useNavigate()
   const dispatch=useDispatch()
   const { redirectTo } = useSelector((state) => state?.auth)||{};
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    //   console.log(watch((data) => console.log(data)));
  const OnSubmit = async(data) => {
    setIsLoading(true)
    //data.preventDefault();
        const UpData = {
            email: data.email,
              password:data.password
          };
          dispatch(loginRequest(UpData))
  };

  //redirect if get the token or not get the token 
  const redirectUser = () => {
    let token = localStorage.getItem("token")
    let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

    if (token !== null && token !== undefined && token !== "") {
      
        isInLoginPage && navigate("/blogs");
    }
}
React.useEffect(() => {
    redirectUser()
}, [redirectTo])

const log = () => {
    dispatch(RegLog())
}
   return (
    <Layout>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(OnSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email", { required: true, maxLength: 20 })}
                autoComplete="email"
                autoFocus
              />
              {errors?.name?.type === "required" && <p style={{color:"red"}}>This field is required</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("password", { required: true, maxLength: 20 })}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors?.name?.type === "required" && <p style={{color:"red"}}>This field is required</p>}
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? <Loading/> : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Layout>
  );
}
export default LogIn







