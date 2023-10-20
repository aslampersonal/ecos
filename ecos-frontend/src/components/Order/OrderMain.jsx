import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./OrderMain.css";

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

        const orderId = JSON.stringify(localStorage.getItem("orderId"));
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

    }, () => {
        //clearing oderid from local storage
        localStorage.removeItem("orderId");
    });


    return (
        <>
            <section style={{display: orderId? "block" : "none" }}>
                <div style={{display: "flex"}}>
                    <TiTick style={{fontSize: "35px", color: "green"}} />
                    <h3>Your order {orderId} has placed successfully</h3>
                </div>
            </section>

            <section className="container py-5 h-100" >
                <div className="o-row d-flex justify-content-center align-items-center h-100">
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
                                        orderList.map((order) => {

                                        let quantity = cart.filter((value) => value === order._id).length;
                                        let totalPrice = order.price * quantity;

                                        return (
                                            <div className="card mb-3" key={order._id}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row align-items-center">
                                                    <div>
                                                    <img
                                                        src= {order.image}
                                                        className="img-fluid rounded-3"
                                                        alt="Shopping item"
                                                        style={{ width: 65 }}
                                                    />
                                                    </div>
                                                    <div className="ms-3">
                                                    <h5>{order.title}</h5>
                                                    <p className="small mb-0">{order.brand}</p>
                                                    <p className="small mb-0">₹{order.price}</p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}