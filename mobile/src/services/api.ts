import axios from 'axios';

const api = axios.create({
  // Put your IP here:
  //baseURL: 'http://{IP}:3001', 
  baseURL: "https://pta-squad-romero.onrender.com",
});

export default api;