import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const url = "/api/users/uploads";
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("dob", user.dob);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("address", user.address);
    formData.append("password", user.password);

    if (image) {
      formData.append("file", image);
    }

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      alert("Welcome to EcoEats! Please sign in to confirm your credentials.");
      navigate("/signIn");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert("There was an error! Please try again later.");
      }
      console.error("There was an error!", error);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              type="text"
              placeholder="Enter username"
              value={user.userName}
              onChange={handleChange}
              id="userName"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              id="email"
            />
            <MDBInput
              label="Your Date of Birth"
              wrapperClass="mb-4"
              size="lg"
              placeholder="Enter date of birth"
              type="date"
              value={user.dob}
              onChange={handleChange}
              id="dob"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Phone Number"
              size="lg"
              placeholder="Enter phone number"
              type="text"
              value={user.phoneNumber}
              onChange={handleChange}
              id="phoneNumber"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Address"
              size="lg"
              placeholder="Enter address"
              type="text"
              value={user.address}
              onChange={handleChange}
              id="address"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Password"
              size="lg"
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
              id="password"
            />
            <div className="input-container">
              <label htmlFor="file" className="custum-file-upload">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      fill=""
                    ></path>
                  </svg>
                </div>
                <div className="text">
                  <span>upload image</span>
                </div>
                <input id="file" type="file" onChange={handleImageChange} />
              </label>
            </div>
            <button
              className="mb-4 w-100 gradient-custom-4 custom-button" // Add a custom class for the button
              style={{
                backgroundColor: "#4caf50", // Change the background color
                color: "#fff", // Change the text color
                border: "none", // Remove border
                borderRadius: "8px", // Add border-radius
                padding: "12px 24px", // Adjust padding
                fontSize: "1.1rem", // Adjust font size
                cursor: "pointer",
                transition: "background-color 0.3s ease", // Add transition for smooth hover effect
              }}
              type="submit"
            >
              Register
            </button>

            <div className="text-center">
              <p className="mb-0">
                Already have an account? <Link to="/signIn">Sign in</Link>
              </p>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
