import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTicket, reset} from '../features/Ticket/ticketSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'


const NewTicket = () => {

  const {user} =  useSelector(state => state.auth)
  const {  isSuccess, isLoading , iserror , message} =  useSelector(state => state.tickets)


  const [name] = useState(user.name)
  const [email ] = useState(user.email)
  const [product , setProduct] =  useState("")
  const [description , setDescription] = useState("")

 const dispatch  =  useDispatch()
 const navigate  =  useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({product , description}))
   
    
  }

  useEffect(()=>{
    if(iserror){
      toast.error(message)
    }
    if(isSuccess ){
        dispatch(reset())
      navigate("/all-tickets")
    }

    dispatch(reset())
  },[dispatch ,isSuccess, iserror , message , navigate ])

  
  if(isLoading){
    return(
      <h1>Loading...</h1>
    )
  }

  return (
    <>
    <BackButton url={"/all-tickets"}/>
    <section className='heading'>
    <h1>Create New Ticket</h1>
    <p>Please fill up all details below</p>
    </section>
    <section className='form'>
      <div className="form-group">
        <label htmlFor="name">Customer Name</label>
        <input type="text" className='form-control'  value={name}  disabled/>
      </div>
      <div className="form-group">
         <label htmlFor="name">Customer Eemail</label>
        <input type="text" className='form-control'  value={email}  disabled />
      </div>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
         <label htmlFor="name">Select Product</label>
        <select required name="product" id="product" value={product} onChange={(e)=> setProduct(e.target.value)}>
        
          <option value="iphone">iPhone</option>
          <option value="ipad">iPad</option>
          <option value="macbook">Macbook</option>
          <option value="imac">iMac</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">Enter Description of your Issue Here</label>
        <textarea name="description" id="description" className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <button className='btn btn-block'>Submit</button>
      </form>
    </section>
    </>
  )
}

export default NewTicket
