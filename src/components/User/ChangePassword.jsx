import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import URL from "../../../env"

export default function ChangePassword(){
    const navigate=useNavigate()
    const location = useLocation();
    console.log(location.state)
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        PrevPassword: "",
        new1Password: "",
        new2Password: "",
    });

    useEffect(() => {
        if (location.state?.user) {
            setUser(location.state.user);
        }
    }, [location.state]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.put(`${URL}/listing/changepassword/${user._id}`, formData, { withCredentials: true });
            console.log("resp", resp)
            if (resp.status === 200) {
                toast.success('User Password Changed')
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
    return (<>
        <div className="UpdateUser my-4 ">
            <form style={{ marginBottom: "6rem" }} onSubmit={handleSubmit}>
                <div className="container row">

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="PrevPassword" className="form-label">Previous Password</label>
                        <input
                            type="number"
                            value={formData.PrevPassword}
                            onChange={handleInputChange}
                            className="form-control"
                            id="PrevPassword"
                            name="PrevPassword"
                            required
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="username" className="form-label">New Password</label>
                        <input
                            type="number"
                            value={formData.new1Password}
                            onChange={handleInputChange}
                            className="form-control"
                            id="new1Password"
                            name="new1Password"
                            required
                            // disabled
                        />
                    </div>

                    <div className="mb-3 mt-4 login ">
                        <label htmlFor="new2Password" className="form-label">Confirm New Password</label>
                        <input
                            type="number"
                            value={formData.new2Password}
                            onChange={handleInputChange}
                            className="form-control"
                            id="new2Password"
                            name="new2Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary my-3 col-3 offset-5" >
                        {/* {loading ? 'Updating...' : 'Update'} */}Change Password
                    </button>
                </div>
            </form>
        </div>

    </>);
}