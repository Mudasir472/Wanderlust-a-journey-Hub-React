import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Home.jsx"
import Navbar from "./components/Navbaar"
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import "./index.css"
import ListingDetails from "./views/ListingDetails.jsx";
import Signup from "./components/Signup.jsx";
import Logout from "./components/Logout.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import UpdateListing from "./views/Listings/UpdateListing.jsx";
import DeleteListing from "./views/Listings/DeleteListing.jsx";
import Review from "./views/Reviews/Review.jsx";


function App() {
  return (
    <>
      <Router>
        <div className="app-container">
        <ToastContainer/>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/edit/:id" element={<UpdateListing />} />
              <Route path="/delete/:id" element={<DeleteListing />} />

              {/* review */}
              <Route path="/review/:id" element={<Review />} />


              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/userdetails" element={<UserProfile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
