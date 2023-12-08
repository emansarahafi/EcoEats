import React, { useState, useEffect } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";

function ListOfForms() {
  const url = "http://localhost:8088/api/customer-service";
  const [customerInquiry, setCustomerInquiry] = useState({ userId: "", name: "", email: "", inquiry: "", status: "Open" });
  const [users, setUsers] = useState([]);
  const [customerServices, setCustomerServices] = useState([]);

  useEffect(() => {
    // Fetch users and customer services when the component mounts
    axios.get("http://localhost:8022/api/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    axios.get(url)
      .then((response) => {
        setCustomerServices(response.data.customerServices);
      })
      .catch((error) => {
        console.error("Error fetching customer services:", error);
      });
  }, []);

  const handleChange = (e) => {
    setCustomerInquiry({ ...customerInquiry, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, customerInquiry)
      .then((response) => {
        console.log(response.data);
        // Handle response...
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleStatusChange = (customerId, newStatus) => {
    axios.put(`${url}/${customerId}`, { status: newStatus })
      .then((response) => {
        // Update the customer services state or handle the response as needed
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the status:", error);
      });
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)", backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image">
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">Customer Service Inquiry</h2>
            <form onSubmit={handleSubmit}>
              {/* ... other form fields ... */}
              <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg" type="submit">
                Submit Inquiry
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>

        {/* Display existing customer services with status modification button */}
        <div>
          <h2>Existing Customer Services</h2>
          {customerServices.map((service) => (
            <div key={service._id}>
              <p>{service.inquiry}</p>
              <p>Status: {service.status}</p>
              {/* Add a button to change the status */}
              <button onClick={() => handleStatusChange(service._id, "In Progress")}>
                Mark as In Progress
              </button>
              <button onClick={() => handleStatusChange(service._id, "Closed")}>
                Mark as Closed
              </button>
            </div>
          ))}
        </div>
      </MDBContainer>
    </div>
  );
}

export default ListOfForms;
