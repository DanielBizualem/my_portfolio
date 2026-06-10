import axios from "axios"
import { baseURL } from "../common/summeryApi.js"

const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true
})



export default Axios