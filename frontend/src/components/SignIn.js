import React, { useState } from "react"; 
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, } from "mdb-react-ui-kit";
import "../App.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
    const url = "/api/signIn";
    const navigate=useNavigate()
    const [user, setUser] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };
    // test commit 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url, user)
            .then((response) => {
                console.log(response.data);
                const token = response.data.token;
                localStorage.setItem("token", token);
                if(response.data.user.role==='user'){navigate('/profile');} 
                else{navigate('/users')}
            })
            .catch((error) => {
            console.error("There was an error!", error); });
    };
    
    return (
        <div style={{ height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image" >
            <div className="mask gradient-custom-3"></div> 
                <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
                    <MDBCardBody className="px-5">
                        <h2 className="text-uppercase text-center mb-5">Sign In to your account</h2>
                        <form onSubmit={handleSubmit}>
                            <MDBInput 
                                wrapperClass="mb-4" 
                                label="Your Email" 
                                size="lg" 
                                placeholder="Enter email"
                                onChange={handleChange}
                                id="email"
                            />
                            <MDBInput
                                wrapperClass="mb-4" 
                                label="Your Password" 
                                size="lg"
                                type="password" 
                                placeholder="Enter password"
                                onChange={handleChange}
                                id="password"
                            />
                            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg" type="submit"> Sign In </MDBBtn>
                            <div className="text-center">
                                <p className="mb-0">Forgot your password? <Link to="/resetPassword">reset password</Link></p>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div> 
    );
}
export default SignIn;