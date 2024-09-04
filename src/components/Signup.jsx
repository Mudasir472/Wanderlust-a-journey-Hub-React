import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const resp = await axios.post("https://wanderlust-backend-qe8j.onrender.com/listing/signup", formData, { withCredentials: true });

            if (resp.status === 200) { // Check for successful response
                const sessionId = resp.data.sessionId;
                if (sessionId) {
                    localStorage.setItem('sessionID', sessionId);
                }
                // navigate(resp.data.redirectUrl); // Redirect to home page
                window.location.href = resp.data.redirectUrl;
                // toast.success("Registered Success");
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            
        }

        setFormData({
            name: "",
            username: "",
            email: "",
            password: ""
        });
    };

    return (
        <>
            <form style={{ marginBottom: "6rem" }} onSubmit={handleSubmit}>
                <div className="container row">
                    <div className="mt-4 DOresponsive">
                        <h3 className="text-xl font-bold mb-3">Signup to Muddu-electronics</h3>
                    </div>
                    <div className="mb-3 mt-4 DOresponsive">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            required
                        />
                    </div>
                    <div className="mb-3 mt-4 DOresponsive">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="mb-3 mt-4 DOresponsive">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            id="email"
                            placeholder="example@gmail.com"
                            aria-describedby="emailHelp"
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 DOresponsive">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="password"
                            id="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3 col-3 offset-5">Submit</button>
                    <hr />
                    {/* Additional buttons or links */}
                </div>
            </form>
        </>
    )
}