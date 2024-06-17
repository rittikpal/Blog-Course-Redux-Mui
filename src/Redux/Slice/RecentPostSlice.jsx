import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchRecentPostData=createAsyncThunk('recentPost/fetch',async()=>{
    const response=await axiosInstance.get('letest-post')
    return response.data
})

 const recentPostSlice=createSlice({
    name:'recentPost',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRecentPostData.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchRecentPostData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
        })
        .addCase(fetchRecentPostData.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default recentPostSlice.reducer