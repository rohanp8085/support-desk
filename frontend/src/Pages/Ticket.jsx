import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { closeTicket, getTicket } from '../features/Ticket/ticketSlice';
import { toast } from 'react-toastify';
import Modal from 'react-modal'
import BackButton from '../components/BackButton';
import { createNotes, getNotes } from '../features/notes/noteSlice';
import NotesItem from './NotesItem';

Modal.setAppElement('#root');

const Ticket = () => {

  const customStyles = {
    with: "600px",
    top: "50%",
    left: "50%",
    right: 'auto',
    bottom: 'auto',
    marginRight: "-50%",
    transform: "translate(-50% , -50%)",
    position: "relative",
    
  }
  const [modalIsOpen, setModalsOpen] = useState(false)

  const [noteText, setNoteText] = useState("")

  //  open/close

  const openModal = () => setModalsOpen(true)
  const closeModal = () => setModalsOpen(false)

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

   
    

  const { notes, isLoading: notesLoading } = useSelector(
    (state) => state.notes
  );
  
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    dispatch(closeTicket(params.id))
    toast.success("Ticket Closed")
    navigate("/all-tickets")
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createNotes(params.id , noteText))
 }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(params.id))

    dispatch(getNotes(params.id))
  }, [isError, message, params.id])

  if (isLoading || notesLoading) {
    return (
      <section className='heading'>
        <p>Loading..</p>
      </section>
    )
  }


  if (isError) {
    return <h3>Somthing went wrong</h3>
  }


  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url={"/all-tickets"} />
        <h2> Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-in')}</h3>
        <h3>Product : {ticket.product}</h3>

        <hr />
        <h2>Notes</h2>
        {notes.map((note) => (<NotesItem key={note._id} note={note} />
        ))}
        <div className="ticket-desc">
          <h3> Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        {
          ticket.status !== "closed" && (
            <button className='btn' onClick={openModal}>Add Note</button>
          )
        }
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
          <h2>Add Note</h2>
          <button className='btn-close' onClick={closeModal}>X</button>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">

              <textarea name="noteText"
                id="noteText"
                onChange={(e) => setNoteText(e.target.value)}
                value={noteText}
                placeholder='Enter Text Here..'
              >
              </textarea>
            </div>
            <div className="form-group">
              <button className="btn" type='submit' >Submit</button>
            </div>
          </form>
        </Modal>
      </header>
      {
        ticket.status !== 'closed' && (
          <button className='btn btn-block' onClick={handleClose}> Close Ticket</button>
        )
      }

    </div>
  )

}

export default Ticket
