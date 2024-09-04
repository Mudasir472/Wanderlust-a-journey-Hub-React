import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteReview() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const [reviewId, setReviewId] = useState(null);

    useEffect(() => {
        // Set reviewId from location state if available
        if (location.state?.item) {
            setReviewId(location.state.item._id);
        }
    }, [location.state]);

    useEffect(() => {
        // Function to delete review
        const deleteReview = async () => {
            if (!reviewId) return; // Exit if reviewId is not set

            try {
                const resp = await axios.delete(`https://wanderlust-backend-qe8j.onrender.com/${id}/delReview/${reviewId}`, { withCredentials: true });

                if (resp.status === 200) {
                    toast.success("Review Deleted Successfully");
                    navigate(`/listing/${id}`); // Navigating to the listing page after deletion
                } else {
                    throw new Error('Delete failed');
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    toast.error("Please Login First");
                    navigate(`/listing/${id}`);
                }
                if (error.response?.status === 402){
                    toast.error("Not Authenticated to delete");
                    navigate(`/listing/${id}`);
                } else {
                    toast.error("Delete operation failed");
                }
                console.error('Error:', error);
            }
        };

        // Only call deleteReview if reviewId is set
        if (reviewId) {
            deleteReview();
        }
    }, [id, navigate, reviewId]);

    return (
        <>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
}

export default DeleteReview;
