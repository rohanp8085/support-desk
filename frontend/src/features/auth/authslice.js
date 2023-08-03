import { createAsyncThunk, createSlice }from "@reduxjs/toolkit" ;
import authService from "./authService";




const userExist = localStorage.getItem("user")
const initialState = {
    user : userExist ? JSON.parse(userExist) : null,
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ""
}

initialState.isAdmin =  true

const authSlice  = createSlice({
    name : "auth",
    initialState,
    reducers :{
      reset : (state) => {
         state.isSuccess = false;
         state.isLoading =  false;
         state.isError = false;
         state.message = "";
      }
    },
    extraReducers : (builder)=>{
     builder.addCase(registerUser.pending , state =>{
       state.isLoading =  true
    }).addCase(registerUser.fulfilled, (state , action)=>{
      state.isLoading = false
      state.isSuccess =  true
      state.user = action.payload

    }).addCase(registerUser.rejected , (state , action)=>{
       state.isLoading =false
       state.isSuccess =  false
       state.isError =  true
       state.message =  action.payload
       state.user =  null
    }).addCase(logoutUser.fulfilled , (state)=>{
      state.user = null
    })
    }
})
export const {reset} = authSlice.actions

export const registerUser = createAsyncThunk("register/user" , async(formdata , thunkAPI)=>{
   try {
      return await authService.register(formdata)
   } catch (error) {
   const  message = error.response.data.message
     return thunkAPI.rejectWithValue(message)
   }
})

 export const logoutUser =  createAsyncThunk("logout/user" , async ()=>{
    await authService.Logout()
 })

export default authSlice.reducer

