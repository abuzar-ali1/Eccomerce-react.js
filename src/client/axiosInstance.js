import axios from "axios";

const axiosClient = axios.create({
    baseURL:"https://fakestoreapi.com/"

})

// request 

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `basic ${token}`

    }
    return config
},(error)=>{
    return Promise.reject(error)
})


// response

axiosClient.interceptors.response.use((resp)=>{
    return resp;

},(error)=>{
    if(error.response.status === 520){
        window.location.href="./../Components/auth/SignIn/SignIn.jsx"
    }
});

export default axiosClient;