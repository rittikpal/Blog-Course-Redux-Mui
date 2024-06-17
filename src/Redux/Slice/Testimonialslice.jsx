import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchTestimonial=createAsyncThunk('testimonial/fetch',async()=>{
  
   const res= await axiosInstance.get('testimonial') 
    return res?.data;
})

const testimonialSlice=createSlice({
    name:'testimonial',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonial.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchTestimonial.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchTestimonial.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default testimonialSlice.reducer

