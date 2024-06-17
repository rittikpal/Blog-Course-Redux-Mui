import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchblogsdetails=createAsyncThunk('blogdetails/fetch',async(id )=>{
  
   const response= await axiosInstance.get(`blogdetails/${id}`) 
    return response?.data?.data;
})


const blogdetailSlice=createSlice({
    name:'blogscategory',
    initialState:{
        data:[],
       
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchblogsdetails.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchblogsdetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchblogsdetails.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
           
   }
})


export default blogdetailSlice.reducer

