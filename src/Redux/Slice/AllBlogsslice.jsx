import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchAllBlog=createAsyncThunk('allblog/fetch',async()=>{
  
   const response= await axiosInstance.get('allBlog') 
    return response?.data;
})

const CourseSlice=createSlice({
    name:'course',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBlog.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchAllBlog.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchAllBlog.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default CourseSlice.reducer

