import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Profile.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Profile() {
  const url = '/api/users';
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [userUpdate, setUpdate] = useState({
    userName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    address: '',
  });
  const reload = () => window.location.reload();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
    if (userId) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${url}/${userId}`, { headers })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.error(error.response.data.msg);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setUpdate({ ...userUpdate, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/${user._id}`, userUpdate);
    } catch (error) {
      console.log(error);
    }
    handleClose();
    reload();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token");
  
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        axios
          .delete(`${url}/${userId}`, { headers })
          .then(() => {
            // Assuming your backend sends a success message
            alert("User deleted successfully.");
            localStorage.removeItem("token"); // Remove the token from local storage
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };  

  return (
    <>
      <div className="profile-container">
        <h3 className="welcome-back">Welcome Back</h3>
        <Card className="profile-card">
          <Card.Body>
            <div className="user-detail">
              <h6>UserName:</h6>
              <Card.Text>{user.userName}</Card.Text>
            </div>
            <div className="user-detail">
              <h6>Email:</h6>
              <Card.Text>{user.email}</Card.Text>
            </div>
            <div className="user-detail">
              <h6>Date of Birth:</h6>
              <Card.Text>{user.dob}</Card.Text>
            </div>
            <div className="user-detail">
              <h6>Phone Number:</h6>
              <Card.Text>{user.phoneNumber}</Card.Text>
            </div>
            <div className="user-detail">
              <h6>Address:</h6>
              <Card.Text>{user.address}</Card.Text>
            </div>
            <div className="update-button">
              <Button variant="success" onClick={handleShow}>
                Update
              </Button>
            </div>
            <div className="delete-button">
              <Button variant="danger" onClick={handleDelete}>
                Delete Account
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.userName}
                onChange={handleChange}
                id="userName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email}
                onChange={handleChange}
                id="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.dob}
                onChange={handleChange}
                id="dob"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.phoneNumber}
                onChange={handleChange}
                id="phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.address}
                onChange={handleChange}
                id="address"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
