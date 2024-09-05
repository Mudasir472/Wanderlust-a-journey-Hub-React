import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Update.css"
import URL from '../../../env'
import { toast } from "react-toastify";

function UpdateListing() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const [listing, setListing] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (location.state?.listing) {
            const { title, description, price, location: loc, country } = location.state.listing;
            setListing(location.state.listing);
            setFormData({ title, description, price, location: loc, country });
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const resp = await axios.put(`${URL}/edit/${id}`, formData, { withCredentials: true });
            console.log("resp", resp)
            if (resp.status === 200) {
                setSuccess(true);
                toast.success('Listing Update Successfull')
                navigate("/");
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            setError('Please Login First');
            toast.error("Please Login First");
            console.error('Error:', error);
            if (error.status === 401) {
                console.log(error)
            }
        } finally {
            setLoading(false);  // Ensure loading is reset even if there's an error
        }
    };

    return (
        <div className="login my-4 ">
            <form style={{ marginBottom: "6rem" }} onSubmit={handleSubmit}>
                <div className="container row">
                    {error && <div className="alert alert-danger col-6 offset-3">{error}</div>}
                    {success && <div className="alert alert-success col-6 offset-3">Listing updated successfully!</div>}

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="form-control"
                            id="title"
                            name="title"
                            required
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control"
                            id="description"
                            name="description"
                            required
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="text"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="form-control"
                            id="price"
                            name="price"
                            required
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="form-control"
                            id="location"
                            name="location"
                            required
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                            type="text"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="form-control"
                            id="country"
                            name="country"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary my-3 col-3 offset-5" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateListing;
