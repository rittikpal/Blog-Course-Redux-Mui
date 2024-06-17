import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchNoOfLikes=createAsyncThunk('noOfLikes/fetch',async(id)=>{
    const response=await axiosInstance.put(`/blog/like/${id}`)
    return response.data
})

const likeslice=createSlice({
    name:'like',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder 
         .addCase(fetchNoOfLikes.pending,(state)=>{
            state.status=STATUSES.LOADING
         })
         .addCase(fetchNoOfLikes.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
         })
         .addCase(fetchNoOfLikes.rejected,(state)=>{
            state.status=STATUSES.ERROR
         })
    }
})
export default likeslice.reducer