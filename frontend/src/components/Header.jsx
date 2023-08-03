import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authslice';


const Header = () => {

     const {user} =  useSelector((state) => state.auth)
     const dispatch =  useDispatch()
     const navigate = useNavigate()

     const handleLogout = () =>{
          dispatch(logoutUser())
          navigate("/login")
     }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
          {
           
            user ? (
                <li>
                <button className="btn" onClick={handleLogout}>Logout</button>
              </li>
                     
              
            ):(
                <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                </>
            )
           
         }
         
        
      </ul>
    </header>
  )
}

export default Header
