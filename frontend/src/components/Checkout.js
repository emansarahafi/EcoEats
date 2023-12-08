import React from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtnGroup,
    MDBBtn,
  } from "mdb-react-ui-kit";
 
function Checkout({selectedItems}) {
    
        const getTotal = () => {
            
            
        
            return selectedItems.reduce((acc, item) => {
              return acc + item.price * item.qte;
            }, 0);
          };
    
  return (
    <MDBContainer className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex flex-row align-items-center">
          <h4 className="text-uppercase mt-1">Eligible</h4>
          <span className="ms-2 me-3">Pay</span>
        </div>
        <a href="/">Cancel and return to the website</a>
      </div>
      <MDBRow>
        <MDBCol md="7" lg="7" xl="6" className="mb-4 mb-md-0">
          <h5 className="mb-0 text-success"> Total price: {getTotal()}</h5>
          <h5 className="mb-3">Diabites Pump &amp; Supplies</h5>
          <div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row mt-1">
                <h6>Insurance Responsibility</h6>
                <h6 className="fw-bold text-success ms-1">$71.76</h6>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Insurer card</span>
              </div>
            </div>
            <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p>
            <div
              className="p-2 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#eee" }}
            >
              <span>Aetna - Open Access</span>
              <span>Aetna - OAP</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row mt-1">
                <h6>Patient Balance</h6>
                <h6 className="fw-bold text-success ms-1">$13.24</h6>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Payment card</span>
              </div>
            </div>
            <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p>
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
            <MDBBtn color="success" size="lg" block>
              Proceed to payment
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="5" lg="4" xl="4" offsetLg="1" offsetXl="2">
          <div className="p-3" style={{ backgroundColor: "#eee" }}>
            <span className="fw-bold">Order Recap</span>
           {selectedItems.map(item=> (
            
            <div className="d-flex justify-content-between mt-2">
              <span>{item.name}</span> <span>{item.qte}</span> <span>${item.price}</span>
            </div>
            
            
            
            ))}



            
            
            
            
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Total </span> <span class="text-success">${getTotal()}</span>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Checkout
