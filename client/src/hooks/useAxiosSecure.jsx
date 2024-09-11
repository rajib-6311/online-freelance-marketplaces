
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    // interceptor 
    // Response interceptors
    axiosSecure.interceptors.response.use(
        res => {
            console.log('Kaj hoi te se', res);
            return res;
        },
        async error => {
            console.log('Error from interceptor', error.response)
            if(error.response.status === 401 || error.response.status === 403){
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        }
    )
    // Request interceptors
    return axiosSecure
};

export default useAxiosSecure;