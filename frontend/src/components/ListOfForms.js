import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

function ListOfForms() {
  const url = "http://localhost:8022/api/forms";
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(url);
      setForms(response.data.forms);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteForm = (formId) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      const token = localStorage.getItem("token");
      console.log(token);

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .delete(`${url}/${formId}`, { headers })
          .then(() => {
            setForms(forms.filter((form) => form._id !== formId));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleStatusChange = (formId, newStatus) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .put(`${url}/${formId}/status`, { status: newStatus }, { headers })
        .then((response) => {
          const updatedForms = forms.map((form) =>
            form._id === formId ? { ...form, status: newStatus } : form
          );
          setForms(updatedForms);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "40px" }}>
      {forms.map((form) => (
        <Accordion key={form._id}>
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
              {form.name.toUpperCase()}
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
                <h5 style={{ marginBottom: "10px", color: "#555" }}>
                  Email: {form.email}
                </h5>
                <h5>Status: {form.status}</h5>
              </div>
              <div>
                <Button
                  style={{ marginRight: "10px" }}
                  variant="success"
                  onClick={() => handleStatusChange(form._id, "Open")}
                >
                  Open
                </Button>
                <Button
                  style={{ marginRight: "10px" }}
                  variant="warning"
                  onClick={() => handleStatusChange(form._id, "In Progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant="info"
                  onClick={() => handleStatusChange(form._id, "Closed")}
                >
                  Closed
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="danger"
                  onClick={() => handleDeleteForm(form._id)}
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

export default ListOfForms;
