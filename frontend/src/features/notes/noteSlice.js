import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
    notes: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            }).addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer


export const getNotes = createAsyncThunk("notes/getAll", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.getNotes(ticketId, token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const createNotes = createAsyncThunk("notes/create", async ( ticketId , thunkAPI,text) => {
    
    // const token = thunkAPI.getState().auth.user.token
   try {
    return await notesService.createNotes( ticketId , text )
   } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
   }
    
})

