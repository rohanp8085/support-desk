import axios from "axios"

const API_URL = "/api/tickets/"

const getNotes = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id + '/notes', config)
  return response.data
}
const createNotes = async (id, token,text) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + id + '/notes',  config,text )
  console.log(response.data)
  return response.data
  
}


const notesService = {
  getNotes,
  createNotes
}
export default notesService