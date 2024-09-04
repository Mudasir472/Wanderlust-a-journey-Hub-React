import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { toast } from "react-toastify"
import "./user.css"

function UserProfile() {
    const fileInputRef = useRef(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://wanderlust-backend-qe8j.onrender.com/listing/profile", { withCredentials: true });
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>No user data available</div>;

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);

            try {
                const response = await axios.post('https://wanderlust-backend-qe8j.onrender.com/listing/changeprofile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true, // Ensure credentials are included
                });

                // Assuming the response contains the updated user info
                console.log('File uploaded successfully:', response.data);
                toast.success("file uploaded successfully")
                setUser(response.data.user); // Update state with the new user data
            } catch (error) {
                console.error('Error uploading the file:', error);
                // Handle errors appropriately (e.g., display error message to user)
            }
        }
    };

    return (
        <div className="user">
            <div className="my-4 bg-slate-100 p-5 DOresponsive  grid grid-cols-1 gap-4 justify-items-center">
                <div className="userinfo flex items-center justify-center">
                    <div className="image">
                        <form encType="multipart/form-data">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                name="profilePic"
                            />
                        </form>
                        <img
                            className="h-16 rounded-full mr-4 cursor-pointer"
                            src={user.image.url}
                            alt=""
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="details">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <h3 className="flex justify-between w-full items-center text-lg font-bold">
                    <p>Name:</p> {user.name}
                </h3>
                <p className="flex justify-between w-full items-center text-md">
                    <p>Username:</p> {user.username}
                </p>
                <p className="flex justify-between w-full items-center text-md">
                    <p>Email:</p> {user.email}
                </p>
            </div>
        </div>
    );
}

export default UserProfile;
