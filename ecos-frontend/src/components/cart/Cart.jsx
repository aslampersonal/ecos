
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

import { MDBTooltip } from "mdb-react-ui-kit";
import { AiFillDelete, AiFillHeart } from "react-icons/ai"
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"
import { FaCcMastercard, FaCcVisa, FaCcPaypal } from "react-icons/fa"

import { useCont } from '../../context/MyContext';
import "./Cart.css";
import Toast from "../Toast/Toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Cart() {
    
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    // const [deliverDate1, setDelivery1] = useState("");
    // const [deliverDate2, setDelivery2] = useState("");
    const [orderid, setOrderId] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [showToast1, setShowToast1] = useState(false);

    const { cart, user, setUser, getCart } = useCont();

    const navigate = useNavigate();

    useEffect(() => {
        
        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {  
          const decodedToken = jwt_decode(jwtToken);
          setUser(decodedToken);
        }

        getCart();
        let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        if (cartProducts) {
          setProducts(cartProducts);
          const totalArr = cartProducts.map((prod) => {
            const qt = cart.filter((value) => value === prod._id).length;
            return prod.price * qt;
          })
          const newTotal = totalArr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
          setTotal(newTotal);
        } else {
          setProducts(null);
        }

        // setting expected delivery date
        // const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth() + 1;
        // const day = date.getDate();
        // setDelivery1([day+3, month, year].join('/'));
        // setDelivery2([day+7, month, year].join('/'));

    }, []);

    async function checkoutSubmit() {
      if (cart.length == 0) {
        setShowToast1(true);
        setTimeout(() => {
            setShowToast1(false);
            window.location.reload();
        }, 2000);
        return;
      }
      const jwtToken = Cookies.get("jwtToken");
      if(!jwtToken) {
          setShowToast(true);
          setTimeout(() => {
              setShowToast(false);
              navigate("/login");
          }, 2000);
          return;
      }
      try {
        const response = await axios.post(`http://localhost:3000/api/users/products/addorders`,
          {cart: cart, total: total+50},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true 
          }
        );
        if (response) {
          console.log(response.data.orderId);
          setOrderId(response.data.orderId);
          
          for(let i=0; i<cart.length; i++) {
            const res = await axios.delete(`http://localhost:3000/api/users/products/cart/${cart[i]}`,
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );
            if (res) {
              console.log(res.data.message);
            } else {
              console.log("Unable to clear cart");
            }
          }

          localStorage.removeItem("cartProducts");
          navigate(`/orders/${response.data.orderId}`);
        }

      } catch (error) {

        console.log("Error ordering product: ", error);

      }
    }

    return (
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        {/* notification toasts */}
        <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
            <Toast show={showToast} type="error" message="Please login to order your products" />
            <Toast show={showToast1} type="warning" message="Your cart is empty" />
        </div>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3" onClick={() => { navigate(-1) }} style={{cursor: "pointer"}}>
                        <a className="text-body link-underline link-underline-opacity-0">
                          <HiArrowNarrowLeft style={{marginRight: "5px"}} />
                          Continue Shopping
                        </a>
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">CART</p>
                          <p className="mb-0">You have {cart?cart.length:0} items in your cart</p>
                        </div>
                      </div>

                      {
                        products.map((prod) => {

                          let quantity = cart.filter((value) => value === prod._id).length;
                          let totalPrice = prod.price * quantity;

                          return (
                            <div className="card mb-3" key={prod._id}>
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      <img
                                        src= {prod.image}
                                        className="img-fluid rounded-3"
                                        alt="Shopping item"
                                        style={{ width: 65 }}
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <h5>{prod.title}</h5>
                                      <p className="small mb-0">{prod.brand}</p>
                                      <p className="small mb-0">₹{prod.price}</p>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    <div style={{ width: 50 }}>
                                      <h5 className="fw-normal mb-0">{quantity}</h5>
                                    </div>
                                    <div style={{ width: 80 }}>
                                      <h5 className="mb-0">₹{totalPrice}</h5>
                                    </div>
                                    <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-3 mb-2"
                                    title="Remove item">
                                        <AiFillDelete />
                                    </MDBTooltip>
                                    <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                                    title="Move to the wish list">
                                        <AiFillHeart />
                                    </MDBTooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                    <div className="col-lg-5">
                      <div className="card bg-dark rounded-3" >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 text-white">CARD DETAILS</h5>
                          </div>
                          <div className="text-white">
                            <p className="small mb-2">Card types</p>
                            <FaCcMastercard className="cards-icons" />
                            <FaCcVisa className="cards-icons" />
                            <FaCcPaypal className="cards-icons" />
                          </div>
                          
                          <form className="mt-4">
                            <div className="">
                              <div className="form-floating form-white mb-4">
                                <input
                                  type="text"
                                  id="cardname"
                                  className="form-control"
                                  placeholder="Cardholder's Name"
                                />
                                <label className="form-label" htmlFor="cardname">
                                  Cardholder's Name
                                </label>
                              </div>
                              <div className="form-floating form-white mb-4">
                                <input
                                  type="text"
                                  id="cardno"
                                  className="form-control"
                                  placeholder="1234 5678 9012 3457"
                                  minLength={19}
                                  maxLength={19}
                                />
                                <label className="form-label" htmlFor="typeText">
                                  Card Number
                                </label>
                              </div>
                              <div className="row mb-4">
                                <div className="col-md-6">
                                  <div className="form-floating form-white">
                                    <input
                                      type="text"
                                      id="cardexpiry"
                                      className="form-control"
                                      placeholder="MM/YYYY"
                                      minLength={7}
                                      maxLength={7}
                                    />
                                    <label className="form-label" htmlFor="typeExp">
                                      Card Expiry Date
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-floating form-white">
                                    <input
                                      type="password"
                                      id="cardcvv"
                                      className="form-control"
                                      placeholder="●●●"
                                      minLength={3}
                                      maxLength={3}
                                    />
                                    <label className="form-label" htmlFor="typeText">
                                      CVV
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between text-white">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">₹{total}</p>
                          </div>
                          <div className="d-flex justify-content-between text-white">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">₹50</p>
                          </div>
                          <div className="d-flex justify-content-between mb-4 text-white">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">₹{total+50}</p>
                          </div>
                          {/* <NavLink to="/orders" state= {{Id: orderid}}> */}
                            <button
                              type="button"
                              className="btn btn-success btn-block btn-lg"
                              style={{width: "100%"}}
                              onClick={checkoutSubmit}
                            >
                              <div
                                className="d-flex justify-content-between "
                                style={{display: "flex", justifyContent: "space-between"}}
                              >
                                <span>₹{total+50}</span>
                                <span>
                                  Checkout{" "}
                                  <HiArrowNarrowRight />
                                </span>
                              </div>
                            </button>
                          {/* </NavLink> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    );

    }