import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authslice"
import ticketReducer from "./Ticket/ticketSlice"
import noteReducer from './notes/noteSlice'
const store = configureStore({
    
    reducer : {
       auth : authReducer,
       tickets : ticketReducer,
       notes : noteReducer,
    }
})

export default store 