import React from 'react'
import { Link } from 'react-router-dom'

const HOme = () => {
  return (
    <>
     <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        Create New Ticket
      </Link>

      <Link to="/all-tickets" className="btn btn-block">
        View My Tickets
      </Link>
    </>
  )
}

export default HOme
