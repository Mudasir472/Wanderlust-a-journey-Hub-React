import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteListing() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [listing, setListing] = useState({});
    const hasDeleted = useRef(false); // Ref to ensure the delete operation runs once

    useEffect(() => {
        // Check if the listing data is available in location.state
        if (location.state?.listing) {
            setListing(location.state.listing);
        }

        const deleteListing = async () => {
            if (hasDeleted.current) return; // Prevents multiple executions

            try {
                hasDeleted.current = true; // Set flag to indicate delete attempt
                const resp = await axios.delete(`https://wanderlust-backend-qe8j.onrender.com/delete/${id}`, { withCredentials: true });

                if (resp.status === 200) {
                    toast.error("Listing Deleted Successfully");
                    navigate("/");
                } else {
                    throw new Error('Delete failed');
                }
            } catch (error) {
                if (!hasDeleted.current) return; // Ensure the error handling runs once
                hasDeleted.current = false; // Reset if error occurs for future attempts
                if (error.response?.status === 401) {
                    toast.error("Please Login First");
                    navigate(`/listing/${id}`);
                    
                } else {
                    toast.error("Delete operation failed");
                }
                console.error('Error:', error);
            }
        };

        // Call the delete function
        deleteListing();

        // Cleanup function to reset ref if component unmounts during the request
        return () => {
            hasDeleted.current = false;
        };

    }, [id, navigate]); // Restrict dependencies to prevent multiple executions

    return (
        <>
        </>
    );
}

export default DeleteListing;
