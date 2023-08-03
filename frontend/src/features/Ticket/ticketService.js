import axios from "axios"

const API_URL = '/api/tickets/'

const create = async(ticketdata , token) => {
    const config  = {
        headers :{
         Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL , ticketdata , config)
         return response.data
};

const getAll  =  async(token) =>{
    const config = {
        headers :{
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL ,  config)
    return response.data
}


const getTicket = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(API_URL + id, config);
    return response.data;
  };

  const closeTicket = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.put(API_URL + id, {status : "closed"}, config);
    return response.data;
  };
const ticketService = {
    create,
    getAll,
    getTicket,
    closeTicket,
}
export default ticketService