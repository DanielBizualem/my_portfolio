export const baseURL = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000" 
    : "https://latestportfolio-cjfw.onrender.com";

const summeryApi = {
    hire:{
        method:'POST',
        url:"api/portfolio/hire"
    },
    message:{
        method:'POST',
        url:"api/portfolio/message"
    },
    chat:{
        method:'POST',
        url:"api/portfolio/chat"
    }
}

export default summeryApi;