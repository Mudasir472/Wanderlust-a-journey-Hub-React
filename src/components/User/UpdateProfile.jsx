import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import URL from "../../../env"
function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        username:"",
        email: "",
    });
    console.log("suer",user._id)
    useEffect(() => {
        if (location.state?.user) {
            const { name,username,email } = location.state.user;
            setUser(location.state.user);
            setFormData({ name, username, email });
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const resp = await axios.put(`${URL}/listing/updateuser/${user._id}`, formData, { withCredentials: true });
            console.log("resp", resp)
            if (resp.status === 200) {
                toast.success('User Update Successfull')
                navigate("/userdetails");
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            toast.error("Please Login First");
            console.error('Error:', error);
            if (error.status === 401) {
                console.log(error)
            }
        } 
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    return ( <>
        <div className="UpdateUser my-4 ">
            <form style={{ marginBottom: "6rem" }} onSubmit={handleSubmit}>
                <div className="container row">

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-control"
                            id="name"
                            name="name"
                            required
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-control"
                            id="username"
                            name="username"
                            required
                            disabled
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary my-3 col-3 offset-5" >
                        {/* {loading ? 'Updating...' : 'Update'} */}Update
                    </button>
                </div>
            </form>
        </div>

    </> );
}

export default UpdateProfile;