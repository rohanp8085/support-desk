import React, { useEffect } from 'react'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets, reset } from '../features/Ticket/ticketSlice'
import TicketItems from './TicketItems'

const Alltickets = () => {

  const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets)
  //  console.log(tickets)
  const dispatch = useDispatch()

    // useEffect(()=>{
    //   return () =>{
    //     dispatch(reset())
    //   }
    // },[dispatch , isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
   return(
    <section className='heading'>
    <p>Loading...</p>
  </section>
   )
  }

  return (
    <div>
      <BackButton url={"/"} />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
        <div>Date</div>
        <div>Product</div>
        <div>Status</div>
        <div></div>
        </div>
        {
          tickets.map(ticket => <TicketItems key={ticket._id} ticket={ticket}  />)
        }
      </div>
    </div>
  )
}

export default Alltickets
