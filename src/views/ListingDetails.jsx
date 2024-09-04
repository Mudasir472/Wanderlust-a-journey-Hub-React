import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify"
import axios from 'axios';
import "./listing.css"

function ListingDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(null);
    const [reviews, setReviews] = useState([])
    const [users, setUsers] = useState([])
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' }); // State for review data

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                const response = await axios.get("https://wanderlust-backend-qe8j.onrender.com/listings");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching listing data:", error);
            } finally {
                setLoading(false);
            }
        };

     

        setIsLogin(localStorage.getItem('sessionID'));
        fetchListingData();
    }, []);
    useEffect(() => {
        const listing = data.find((item) => item._id === id);
        if (listing) {
            setReviews(listing.review || []);
        }
    }, [data, id]);

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://wanderlust-backend-qe8j.onrender.com/review/${id}`, reviewData, { withCredentials: true });
            window.location.href = `/listing/${id}`
        } catch (error) {
            if (error.status === 401) {
                toast.error("Please Login First")
            }
        }
    };
    
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const listing = data.find((item) => item._id === id);


    const handleUpdate = () => {
        navigate(`/edit/${id}`, { state: { listing } });
    };

    const handleDelete = () => {
        navigate(`/delete/${id}`, { state: { listing } });
    };
    const handleDeleteReview = (item) => {
        navigate(`/deleteReview/${id}`, { state: { item } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!listing) {
        return <div>Listing not found</div>;
    }
    return (
        <div className='container'>
            <h3 className='h-20 d-flex headding align-items-center offset-2 font-sans text-2xl font-bold col-3'>
                {listing.title}
            </h3>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className="card  listInd border-0 mb-3">
                    <img
                        className='h-96 w-full mb-4 card-img-top'
                        src={listing.image.url}
                        alt={listing.title}
                    />
                    <div className="card-body">
                        <p className="card-text mb-3">{listing.description}</p>
                        <p className='mb-3'>&#8377;{listing.price.toLocaleString("en-IN")}</p>
                        <p className='mb-3'>{listing.location}</p>
                        <p className='mb-3'>{listing.country}</p>
                    </div>
                </div>
            </div>

            {isLogin ? (
                <div className="mb-5 editForm d-flex align-items-center offset-2 font-sans">
                    <button className='btn btn-primary' onClick={handleUpdate}>
                        Edit
                    </button>
                    <button className='mx-4 btn btn-primary' onClick={handleDelete}>
                        Delete Listing
                    </button>
                </div>
            ) : null}

            <hr />
            <div className="review d-flex flex-column justify-center align-items-start offset-2 font-sans">
                <h3 className='mb-3 d-flex align-items-center font-sans text-2xl font-bold'>
                    Reviews Section
                </h3>
                <div className="showReviews m-3">
                    <div className="allReviews d-flex flex-wrap align-items-center justify-content-between">
                        {
                            reviews.map((item) => (

                                <div key={item._id} className="p-1 w-100percent col-sm-6 mb-3 mb-sm-0">

                                    <div className="shadow-md shadow-inner card h-48 flex items-start	justify-between	">
                                        <div className="card-body flex flex-column items-start justify-evenly w-full">
                                            <h5 className="card-title">{item.author?.name || "@Muddu"}</h5>
                                            <p className="starability-result" data-rating={item.rating}></p>
                                            <p className="card-text">{item.comment}</p>
                                            <a onClick={() => { handleDeleteReview(item) }} className="btn btn-primary">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {isLogin ? (<form className='w-100percent2	' onSubmit={submitReview}>
                    <fieldset className="starability-slot">
                        <input
                            type="radio"
                            id="rate-1"
                            name="rating"
                            value="1"
                            checked={reviewData.rating === '1'}
                            onChange={handleReviewChange}
                        />
                        <label htmlFor="rate-1" title="1 star"></label>
                        <input
                            type="radio"
                            id="rate-2"
                            name="rating"
                            value="2"
                            checked={reviewData.rating === '2'}
                            onChange={handleReviewChange}
                        />
                        <label htmlFor="rate-2" title="2 stars"></label>
                        <input
                            type="radio"
                            id="rate-3"
                            name="rating"
                            value="3"
                            checked={reviewData.rating === '3'}
                            onChange={handleReviewChange}
                        />
                        <label htmlFor="rate-3" title="3 stars"></label>
                        <input
                            type="radio"
                            id="rate-4"
                            name="rating"
                            value="4"
                            checked={reviewData.rating === '4'}
                            onChange={handleReviewChange}
                        />
                        <label htmlFor="rate-4" title="4 stars"></label>
                        <input
                            type="radio"
                            id="rate-5"
                            name="rating"
                            value="5"
                            checked={reviewData.rating === '5'}
                            onChange={handleReviewChange}
                        />
                        <label htmlFor="rate-5" title="5 stars"></label>
                    </fieldset>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Comment</label>
                        <textarea
                            className="form-control"
                            placeholder="Your Comment"
                            name="comment"
                            id="comment"
                            rows="7"
                            cols="25"
                            value={reviewData.comment}
                            onChange={handleReviewChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-danger">Submit</button>
                </form>) : null}

            </div>
        </div>
    );
}

export default ListingDetails;
