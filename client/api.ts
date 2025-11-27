import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3001kkkkkkkkkkk",
});


console.log("✔️API base URL:", api.defaults.baseURL);

export default api