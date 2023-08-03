import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";





 const initialState =  {
      tickets : [],
      ticket : {},
      isError : false,
      isLoading : false,
      isSuccess : false,
      message : ""
 }
const ticketSlice = createSlice({
    name : "ticket",
    initialState,
    reducers : {
      reset: (state) => initialState,
     
    },
    
    extraReducers : (builder) => {
        builder.addCase(createTicket.pending, state =>{
             state.isLoading = true
        }).addCase(createTicket.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            // state.tickets = [...state.tickets , action.payload]
            // state.ticket = action.payload
        }).addCase(createTicket.rejected , (state , action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets = action.payload;
          })
          .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(getTicket.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.ticket = action.payload;
          })
          .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          }).addCase(closeTicket.fulfilled , (state , action)=>{
            state.isLoading = false
            state.tickets.map((ticket => ticket._id === action.payload._id ? (ticket.status = "closed")  : ticket)
            )
          })
    }
})
export  const { reset } =  ticketSlice.actions
export default ticketSlice.reducer

export const createTicket  = createAsyncThunk("tickets/create" , async( ticketdata , thunkAPI)=>{
   try { 
        const token = thunkAPI.getState().auth.user.token
      return await ticketService.create(ticketdata , token)
   } catch (error) {
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
   }
 })

 export const getTickets = createAsyncThunk("tickets/getAll" , async( _ , thunkAPI )=>{

    try {
        const token  = thunkAPI.getState().auth.user.token
        // console.log(token)
       return await ticketService.getAll(token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
 })

 export const getTicket = createAsyncThunk("tickets/get" , async( ticketId, thunkAPI )=>{

  try {
      const token  = thunkAPI.getState().auth.user.token
     return await ticketService.getTicket(ticketId, token)
  } catch (error) {
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
  }
})

export const closeTicket = createAsyncThunk("tickets/close" , async(ticketId , thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.closeTicket(ticketId , token)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})


  