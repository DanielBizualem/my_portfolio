export const baseURL = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000" 
    : "https://my-portfolio-ugr9.onrender.com";

const summeryApi = {
    hire:{
        method:'POST',
        url:"api/portfolio/hire"
    },
    message:{
        method:'POST',
        url:"/api/portfolio/message"
    }
}

export default summeryApi;