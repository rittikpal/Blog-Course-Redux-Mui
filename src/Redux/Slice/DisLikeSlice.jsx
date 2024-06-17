import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchNoOfDisLikes=createAsyncThunk('noOfDislike/fetch',async(id)=>{
    const response=await axiosInstance.put(`blog/unlike/${id}`)
    return response.data
})

const dislikeSlice=createSlice({
    name:'dislike',
    initialState:{
        data:[],
        status: STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(build)=>{
        build
         .addCase(fetchNoOfDisLikes.pending,(state)=>{
            state.status=STATUSES.LOADING
         })
         .addCase(fetchNoOfDisLikes.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
         })
         .addCase(fetchNoOfDisLikes.rejected,(state)=>{
            state.status=STATUSES.ERROR
         })
    }
})
export default dislikeSlice.reducer