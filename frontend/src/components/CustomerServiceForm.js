import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";

function CustomerServiceForm() {
    const url = "/api/customerservices"; // Update the API endpoint for customer service
    const [customerInquiry, setCustomerInquiry] = useState({ name: "", email: "", inquiry: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCustomerInquiry({ ...customerInquiry, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url, customerInquiry)
            .then((response) => {
                console.log(response.data);
                // Handle response...
                alert("Request submitted! We will get back to you as soon as possible.");
                navigate("/");
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    return (
        <div style={{ height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image">
                <div className="mask gradient-custom-3"></div>
                <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
                    <MDBCardBody className="px-5">
                        <h2 className="text-uppercase text-center mb-5">Customer Service Inquiry</h2>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Name"
                                size="lg"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                id="name"
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Email"
                                size="lg"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                id="email"
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Inquiry"
                                size="lg"
                                type="textarea"
                                placeholder="Enter your inquiry"
                                onChange={handleChange}
                                id="inquiry"
                            />
                            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg" type="submit">Submit Inquiry</MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default CustomerServiceForm;
