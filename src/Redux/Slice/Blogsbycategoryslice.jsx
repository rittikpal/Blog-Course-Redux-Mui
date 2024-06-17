import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchblogsCategory=createAsyncThunk('blogscategory/fetch',async(categoryId )=>{
  
   const response= await axiosInstance.get(`category/post/${categoryId}`) 
    return response?.data?.data;
})

const blogsCategorySlice=createSlice({
    name:'blogscategory',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchblogsCategory.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchblogsCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchblogsCategory.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default blogsCategorySlice.reducer

