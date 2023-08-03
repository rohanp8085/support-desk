import React from 'react'
import UseAuthStatus from '../Hooks/UseAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    
const {logedin , checkingStatus} = UseAuthStatus()

if(checkingStatus){

    return (
        <h1>loading...</h1>
    )
}
return logedin ? <Outlet/> : <Navigate to="/login"/>
  
}

export default PrivateRoute
