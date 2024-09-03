import axios from 'axios';
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

export default async function Logout() {
    try {
        const response = await axios.post('http://localhost:8090/listing/logout', {}, { withCredentials: true });

        if (response.status === 200) {
            console.log(response.data.message); // "Logout successful"
            toast.success("Login Success");
            // Remove session-related data from local storage
            localStorage.removeItem('sessionID');

            // Redirect or handle logout success
            window.location.href = response.data.redirectUrl;
        }
    } catch (error) {
        console.error('Error logging out:', error.response ? error.response.data.message : error.message);
    }
    return (
        <>

        </>
    )
}