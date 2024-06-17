import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";
import { toast } from "react-toastify";


export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchContact=createAsyncThunk('contact/fetch',async(data)=>{
  
    console.log("Form data:", data);
  
   try{
        const res=await axiosInstance.post(`contact/create`,data)
        toast.success(res?.data?.message)
        
   }catch(error){
    console.log(error);
   }
  
})

const ContactSlice=createSlice({
    name:'contact',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContact.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchContact.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default ContactSlice.reducer

