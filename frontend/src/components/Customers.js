import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

function Customers() {
  const url = "http://localhost:8022/api/users";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url);
      // Filter users with role 'user' before setting the state
      const filteredUsers = response.data.users.filter(user => user.role === 'user');
      setUsers(filteredUsers);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token");
      console.log(token);

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .delete(`${url}/${userId}`, { headers })
          .then(() => {
            setUsers(users.filter((user) => user._id !== userId));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "40px" }}>
      {users.map((user) => (
        <Accordion key={user._id}>
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
              {user.userName.toUpperCase()}
              {/* Display user's profile image from the server */}
              <img
                src={`http://localhost:8022/${user.profileImagePath}`}
                style={{ maxWidth: "100px" }}
                alt="Description"
              />
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
                  Email: {user.email}
                </h5>
                <h5>DOB: {user.dob}</h5>
                <h5>Address: {user.address}</h5>
                <h5>Phone Number: {user.phoneNumber}</h5>
              </div>
              <div>
                <Button
                  style={{ width: "80px" }}
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
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

export default Customers;
