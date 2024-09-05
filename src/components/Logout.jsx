import axios from 'axios';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import URL from "../../env"
import { useEffect } from 'react';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("called")
        const loggout = async () => {
            try {
                const response = await axios.post(`${URL}/listing/logout`, {}, { withCredentials: true });

                if (response.status === 200) {
                    console.log(response.data.message); // "Logout successful"
                    toast.success("Logout Success");
                    // Remove session-related data from local storage
                    localStorage.removeItem('sessionID');

                    // Redirect or handle logout success
                    // navigate(response.data.redirectUrl)
                    window.location.href = response.data.redirectUrl;
                }
                else {
                    // window.location.href = "/";
                    console.log("not log")
                }
            } catch (error) {
                console.error('Error logging out:', error.response ? error.response.data.message : error.message);
                // window.location.href = "/";
                console.log("not log")
            }
        }

        loggout();
    }, [])

    return (
        <>
            loading..
        </>
    )
}