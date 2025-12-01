import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3001",
});


console.log("✔️API base URL:", api.defaults.baseURL);

export default api