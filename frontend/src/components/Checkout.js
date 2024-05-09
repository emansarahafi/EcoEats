import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Checkout({ selectedItems, clearCart }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const getTotal = () => {
    let total = 0;
    selectedItems.forEach((product) => {
      total += product.price * product.qte;
    });
    return Math.round(total * 100) / 100;
  };

  const onSubmitOrder = async () => {
    try { 
      setIsLoading(true);
      const total = getTotal();
      const token = localStorage.getItem("token");
      await axios.post("/api/orders",
      {
        products: selectedItems.map(product => product._id),
        totalPrice: total,
      },
      {
        headers: { Authorization: 'Bearer ' + token,},
      });
      clearCart();
      navigate('/orders');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <a href="/">Cancel and return to the website</a>
      </div>
      <MDBRow>
        <MDBCol md="7" lg="7" xl="6" className="mb-4 mb-md-0">
          <h5 className="mb-0 text-success"> Total price: {getTotal()}</h5>
          <hr />
          <h5 className="mb-3">Thank you for using EcoEats!</h5>
          <div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Payment card</span>
              </div>
            </div>
            <div class="d-flex flex-column mb-3">
              <MDBBtnGroup vertical aria-label="Vertical button group">
                <input
                  type="radio"
                  className="btn-check"
                  name="options"
                  id="option1"
                  autocomplete="off"
                />
                <label className="btn btn-outline-primary btn-lg" for="option1">
                  <div className="d-flex justify-content-between">
                    <span>VISA </span>
                    <span>**** 5436</span>
                  </div>
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="options"
                  id="option2"
                  autocomplete="off"
                  checked
                />
                <label className="btn btn-outline-primary btn-lg" for="option2">
                  <div className="d-flex justify-content-between">
                    <span>MASTER CARD </span>
                    <span>**** 5038</span>
                  </div>
                </label>
              </MDBBtnGroup>
            </div>
            {!!selectedItems?.length && (
              <MDBBtn
                color="success"
                size="lg"
                onClick={() => onSubmitOrder()}
                disabled={isLoading}
                block
              >
                Submit order
              </MDBBtn>
            )}
          </div>
        </MDBCol>
        <MDBCol md="5" lg="4" xl="4" offsetLg="1" offsetXl="2">
          <div className="p-3" style={{ backgroundColor: "#eee" }}>
            <span className="fw-bold"> Recap</span>
            {selectedItems.map((item) => (
              <div className="d-flex justify-content-between mt-2">
                <span>{item.name}</span> <span>{item.qte}</span>{" "}
                <span>${item.price * item.qte}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Total </span>{" "}
              <span class="text-success">${getTotal()}</span>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Checkout;
