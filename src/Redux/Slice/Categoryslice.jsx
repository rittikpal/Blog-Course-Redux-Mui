import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/Axiosinstance";

export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchCategory=createAsyncThunk("AllCategory/fetch",async()=>{
    
        const res= await axiosInstance.get('showallcategory');
        return res?.data;
   
});
export const LatestPost=createAsyncThunk("letest-post/fetch",async()=>{
    try{
        const res= await axiosInstance.get('letest-post');
        return res?.data;
    }catch(error){
        console.log(error);
    }
});

const categorySlice=createSlice({
    name:'category',
    initialState:{
  
    data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategory.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchCategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchCategory.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
             }
})


export default categorySlice.reducer