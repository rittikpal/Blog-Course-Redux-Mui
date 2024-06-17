import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Api/Axiosinstance";



export const STATUSES=Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
})

export const fetchTeam=createAsyncThunk('team/fetch',async()=>{
  
   const res= await axiosInstance.get('team') 
    return res?.data;
})

const teamSlice=createSlice({
    name:'team',
    initialState:{
        data:[],
        status: STATUSES.IDLE,
    },
    reducers:{
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeam.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchTeam.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchTeam.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
            
    },
})


export default teamSlice.reducer

