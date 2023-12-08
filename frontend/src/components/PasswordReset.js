import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";

function PasswordReset() {
  const url = "http://localhost:8088/api/users/reset-password"; // Update the URL for password reset
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(url, user)
      .then((response) => {
        console.log(response.data);
        // Handle response...
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image">
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-4"
                label="Your Email"
                size="lg"
                placeholder="Enter email"
                onChange={handleChange}
                id="email"
              />
              {/* You may want to add additional fields for new password and confirmation */}
              {/* For example: */}
              {/* <MDBInput
                wrapperClass="mb-4"
                label="New Password"
                size="lg"
                type="password"
                placeholder="Enter new password"
                onChange={handleChange}
                id="newPassword"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                size="lg"
                type="password"
                placeholder="Confirm new password"
                onChange={handleChange}
                id="confirmPassword"
              /> */}
              <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg" type="submit">
                Reset Password
              </MDBBtn>
              <div className="text-center">
                <p className="mb-0">
                  Remember your password? <Link to="/signIn">Sign in</Link>
                </p>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default PasswordReset;
