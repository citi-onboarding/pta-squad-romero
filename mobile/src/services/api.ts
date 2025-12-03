import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.3:3001', 
//   baseURL: "https://pta-squad-romero.onrender.com",
});

export default api;