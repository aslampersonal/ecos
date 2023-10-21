import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./OrderMain.css";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HiArrowNarrowLeft } from "react-icons/hi";

import { TiTick } from "react-icons/ti"
// import { MDBTooltip } from "mdb-react-ui-kit";
// import { AiFillDelete, AiFillHeart } from "react-icons/ai"
// import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"
// import { FaCcMastercard, FaCcVisa, FaCcPaypal } from "react-icons/fa"

import { useCont } from '../../context/MyContext';
import { NavLink, useLocation, useParams } from "react-router-dom";
import { BsFillCalendarDateFill } from "react-icons/bs";

export default function OrderMain() {

    const [products, setProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [Id, setId] = useState("");
    const { user, setUser, orders, getOrders } = useCont();
    const loc = useLocation().state;
    const { orderId } = useParams();

    useEffect(() => {

        setId(JSON.stringify(localStorage.getItem("orderId")));
        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
          const decodedToken = jwt_decode(jwtToken);
          setUser(decodedToken);
          getOrders();
          setOrderList(JSON.parse(localStorage.getItem('orders')) || []);
          setProducts(JSON.parse(localStorage.getItem("fullProducts")));
        }

        console.log(orderList);

        return () => {
            //clearing oderid from local storage
            localStorage.removeItem("orderId");
        }

    }, []);


    return (
        <>
            <section style={{display: orderId? "block" : "none" }}>
                <div style={{display: "flex"}}>
                    <TiTick style={{fontSize: "35px", color: "green"}} />
                    <h3>Your order {orderId} has placed successfully</h3>
                </div>
            </section>

            <section className="container py-5 h-100 d-flex justify-content-center" >
                <div className="o-row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <h6 className="mb-3">
                            <a href="#!" className="text-body link-underline link-underline-opacity-0">
                            <HiArrowNarrowLeft style={{marginRight: "5px"}} />
                            Continue Shopping
                            </a>
                        </h6>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-1">Your Orders:</h4>
                        </div>

                        {
                            orderList.map((order) => {

                            return (
                                <div className="order-main">
                                    <div className="order-main-top">
                                        <span><strong>Order Id: </strong>{order._id}</span>
                                        <span>₹{order.payment}</span>
                                        <span><BsFillCalendarDateFill style={{fontSize:"20px", marginRight: "10px"}} />{order.orderDate.slice(0, 10)}</span>
                                    </div>
                                    <div className="order-main-prods">
                                        {
                                            order.products.map((id) => {
                                                products.forEach((product) => {
                                                    if (id === product._id) {
                                                        return (
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                    <img
                                                                        src= {product.image}
                                                                        className="img-fluid rounded-3"
                                                                        alt="Shopping item"
                                                                        style={{ width: 65 }}
                                                                    />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                    <h5>{product.title}</h5>
                                                                    <p className="small mb-0">{product.brand}</p>
                                                                    <p className="small mb-0">₹{product.price}</p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="d-flex flex-row align-items-center">
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
                                                                </div> */}
                                                            </div>
                                                        )
                                                    }
                                                })
                                            })
                                        }
                                    </div>
                                </div>
                            )
                            //     return (
                            //     <div className="card mb-3" key={order._id}>
                            //     <div className="card-body">
                            //         <div className="d-flex justify-content-between">
                            //         <div className="d-flex flex-row align-items-center">
                            //             <div>
                            //             <img
                            //                 src= {order.image}
                            //                 className="img-fluid rounded-3"
                            //                 alt="Shopping item"
                            //                 style={{ width: 65 }}
                            //             />
                            //             </div>
                            //             <div className="ms-3">
                            //             <h5>{order.title}</h5>
                            //             <p className="small mb-0">{order.brand}</p>
                            //             <p className="small mb-0">₹{order.price}</p>
                            //             </div>
                            //         </div>
                            //         <div className="d-flex flex-row align-items-center">
                            //             <div style={{ width: 50 }}>
                            //             <h5 className="fw-normal mb-0">{quantity}</h5>
                            //             </div>
                            //             <div style={{ width: 80 }}>
                            //             <h5 className="mb-0">₹{totalPrice}</h5>
                            //             </div>
                            //             <MDBTooltip wrapperProps={{ size: "sm", color: "danger" }} wrapperClass="me-3 mb-2"
                            //             title="Remove item">
                            //                 <AiFillDelete />
                            //             </MDBTooltip>
                            //             <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                            //             title="Move to the wish list">
                            //                 <AiFillHeart />
                            //             </MDBTooltip>
                            //         </div>
                            //         </div>
                            //     </div>
                            //     </div>
                            // )
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )

}