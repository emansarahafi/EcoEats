import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

function CustomerServiceRequests() {
  const url = "/api/customerservices";
  const [customerServiceRequest, setCustomerServiceRequest] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(url);
      setCustomerServiceRequest(response.data.customerServices);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleDeleteForm = (requestId) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .delete(`${url}/${requestId}`, { headers })
          .then(() => {
            setCustomerServiceRequest((prevRequest) =>
              prevRequest.filter((request) => request._id !== requestId)
            );
          })
          .catch((err) => {
            console.error("Error deleting form:", err);
          });
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "40px" }}>
      {customerServiceRequest && customerServiceRequest.map((request) => (
        <Accordion key={request._id}>
          <Accordion.Item eventKey="0">
            <Accordion.Header
              style={{
                backgroundColor: "lightgrey",
                color: "white",
                fontWeight: "bold",
                padding: "10px 10px",
                borderBottom: "1px solid #e3e3e3",
                cursor: "pointer",
              }}
            >
              {request.name.toUpperCase()}
            </Accordion.Header>
            <Accordion.Body
              style={{
                padding: "15px",
                fontSize: "16px",
                lineHeight: "1.5",
                color: "#333",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p>Email: {request.email}</p>
                <p>Inquiry: {request.inquiry}</p>
                <p>Status: {request.status}</p>
                <p>Creation Date: {new Date(request.date).toLocaleDateString()}</p>
              </div>
              <div>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="danger"
                  onClick={() => handleDeleteForm(request._id)}
                >
                  Delete
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}

export default CustomerServiceRequests;
