import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchBanner=createAsyncThunk('banner/fetch',async()=>{
  
   const res= await axiosInstance.get('banner') 
    return res?.data;
})

const bannerSlice=createSlice({
    name:'banner',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanner.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default bannerSlice.reducer

