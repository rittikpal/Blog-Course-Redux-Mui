import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Api/Axiosinstance'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
  loading: false,
  user: {}, // for user object
  redirectTo: null,
  Logouttoggle: false,
  userName: false,
  redirectReg: null
}

export const registerUser = createAsyncThunk("/signup", async (user) => {
  try {
    const ress = await axiosInstance.post("register", user);
    return ress?.data;

  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);
  }
});

export const loginRequest = createAsyncThunk("login", async (user) => {
  try {
    const res = await axiosInstance.post("login", user);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
});



export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //check for auth token 
    check_token: (state, { payload }) => {
      let token = localStorage.getItem("token");
      if (token !== null && token !== undefined) {
        state.Logouttoggle = true;
      }
    },

    logout: (state, { payload }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast.success("logout successfully")
      state.Logouttoggle = false

    },

    
    RegLog: (state, { payload }) => {
      localStorage.removeItem("name");
      state.Logouttoggle = false

    },

    redirectToo: (state, { payload }) => {
      state.redirectTo = payload
    },

    redirectTo_Register: (state, { payload }) => {
      state.redirectReg = payload
    }


  },

  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        if (payload.success === true) {
          localStorage.setItem("name", payload.data.name);
          state.redirectReg = "/login";
          toast.success(`Hi ${payload?.data?.name}, registration successful!`);
        }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  
    // Login Request
    builder
      .addCase(loginRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          localStorage.setItem("token", payload?.token);
          localStorage.setItem("name", payload?.user.name);
          state.Logouttoggle = true; 
          state.redirectTo = "/blogs";
          toast.success(`Hi ${payload?.user.name}, ${payload?.message}`);
        }
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.loading = false;
      });
  }
  
})

export const {
  check_token, redirectToo, logout, redirectTo_Register,RegLog } = AuthSlice.actions

