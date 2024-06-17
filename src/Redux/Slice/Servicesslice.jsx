import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchService=createAsyncThunk('service/fetch',async()=>{
  
   const res= await axiosInstance.get('service') 
    return res?.data;
})

const servicesSlice=createSlice({
    name:'services',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchService.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchService.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchService.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default servicesSlice.reducer

