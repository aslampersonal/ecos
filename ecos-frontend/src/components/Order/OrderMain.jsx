import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { TiTick } from "react-icons/ti"
import { MDBTooltip } from "mdb-react-ui-kit";
import { AiFillDelete, AiFillHeart } from "react-icons/ai"
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"
import { FaCcMastercard, FaCcVisa, FaCcPaypal } from "react-icons/fa"

import { useCont } from '../../context/MyContext';
import { NavLink, useLocation, useParams } from "react-router-dom";

export default function OrderMain() {

    const [products, setProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [total, setTotal] = useState(0);
    const { user, setUser, orders, setOrders, getOrders } = useCont();
    const loc = useLocation().state;
    const { orderId } = useParams();

    useEffect(() => {

        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
          const decodedToken = jwt_decode(jwtToken);
          setUser(decodedToken);
          getOrders();
          setOrderList(JSON.parse(localStorage.getItem('orders')) || []);
          setProducts(localStorage.getItem("productData"));
        }

        console.log(orderList);

        // const productData = localStorage.getItem("productData");
        // if (productData) {
        //   let productList = [];
        //   let newCart = [...new Set(response.data.cart)];
        //   for (let i=0; i<newCart.length; i++) {
        //     const newpd = JSON.parse(productData).filter((prod) => prod._id == newCart[i]);
        //     productList.push(newpd[0]);
        //   }
        //   setCartProds(productList);
        //   localStorage.setItem("cartProducts", JSON.stringify(productList));
        // }

    }, []);


    return (
        <>
            <section>
                <div style={{display: "flex"}}>
                    <TiTick style={{fontSize: "35px", color: "green"}} />
                    <h3>Your order {orderId} has placed successfully</h3>
                </div>
            </section>
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                    <div className="card">
                        <div className="card-body p-4">
                        <div className="row">
                            <div className="col-lg-7">
                            <h5 className="mb-3">
                                <a href="#!" className="text-body link-underline link-underline-opacity-0">
                                <HiArrowNarrowLeft style={{marginRight: "5px"}} />
                                Continue Shopping
                                </a>
                            </h5>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                <p className="mb-1">CART</p>
                                <p className="mb-0">You have {orderList.length} items in your cart</p>
                                </div>
                            </div>

                            {/* {
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
                            } */}

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
                                <button
                                type="button"
                                className="btn btn-success btn-block btn-lg"
                                style={{width: "100%"}}
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
        </>
    )

}