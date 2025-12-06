import axios from "axios";
const api = axios.create({

    //For local development, replace the current url  by the localhost one:
    // baseURL: "http://localhost:3001",
    //Remeber: Dont commit this change for production!
    baseURL: "https://pta-squad-romero.onrender.com",
});


console.log("✔️API base URL:", api.defaults.baseURL);

export default api