import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HOme from './Pages/HOme'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NewTicket from './Pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Alltickets from './Pages/Alltickets';
import Ticket from './Pages/Ticket';


const App = () => {
  return (
    <>
   <Router>
     <div className='container'>
      <Header/>
      <Routes>
      <Route path='/' element={<HOme/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<>
        <PrivateRoute/>
        </>}>
        <Route path='/new-ticket'  element ={<NewTicket/>}/>
        <Route path='/all-tickets'  element={<Alltickets/>}/>
        <Route path='all-tickets/ticket/:id' element={<Ticket/>}/>
        </Route>
      </Routes>
    </div>
   </Router>
   <ToastContainer/>
   </>
  )
}

export default App
