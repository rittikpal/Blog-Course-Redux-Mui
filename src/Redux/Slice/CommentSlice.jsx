import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance"
import { toast } from "react-toastify"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const addComment=createAsyncThunk('createComment/fetch',async({blogId,upData})=>{
    console.log("xyz",blogId,upData);
  try {
    const response=await axiosInstance.post(`blog/${blogId}/comment/create`,upData)
    toast.success(response?.data?.message);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data.message);
  }
})


  


export const fetchCommentSectionData=createAsyncThunk('comment/fetch',async(id)=>{
    const response=await axiosInstance.get(`comment/${id}`)
    return response.data
})

 const commentSectionSlice=createSlice({
    name:'commentsection',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder 
         .addCase(fetchCommentSectionData.pending,(state)=>{
            state.status=STATUSES.LOADING
         })
         .addCase(fetchCommentSectionData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.LOADING
         })
         .addCase(fetchCommentSectionData.rejected,(state)=>{
            state.status=STATUSES.ERROR
         })
    }
})
 export default commentSectionSlice.reducer