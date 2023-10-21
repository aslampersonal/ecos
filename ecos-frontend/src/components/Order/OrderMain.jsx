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
import axios from "axios";
import Toast from "../Toast/Toast";

export default function OrderMain() {

    const [products, setProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [Id, setId] = useState("");
    const [showToast, setShowToast] = useState(false);
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

    async function cancelOrder(id) {
        try {
            const jwtToken = Cookies.get("jwtToken");

            const response = await axios.put(`http://localhost:3000/api/users/orders/updateorders/${id}`,
            { status: "Cancelled" },
            {
                method: 'PUT', // Use PUT request to update the resource
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
                },
            });
            console.log(response.data.message);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                window.location.reload();
            }, 2000); 
        } catch (error) {
            console.log('Error updating order status:', error);
        }
    }


    return (
        <>
            {/* notification toasts */}
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                <Toast show={showToast} type="success" message="Your Order has been cancelled" />
            </div>
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
                                <div className="order-main" key={order._id}>
                                    <div className="order-main-top">
                                        <span><strong>ID: </strong>{order._id}</span>
                                        <span><BsFillCalendarDateFill style={{fontSize:"20px", marginRight: "10px"}} />{order.orderDate.slice(0, 10)}</span>
                                        <span><strong>₹{order.payment}</strong></span>
                                        <span style={{color: order.status === "Cancelled"? "red": "green"}}>{order.status}</span>
                                        <button className="cncl-btn" style={{display: order.status === "Cancelled"? "none": "block"}} onClick={() => {cancelOrder(order._id)}}>Cancel</button>
                                    </div>
                                    <div className="order-main-prods">
                                        {
                                            order.products.map((id) => {
                                                return (
                                                    <div key={id}>{
                                                    products.map((product) => {
                                                    if (id === product._id) {
                                                        return (
                                                            <div className="prod-div" key={product._id}>
                                                                <div className="">
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
                                                                </div>
                                                                <div>
                                                                    <p className="mb-0"><strong>₹{product.price}</strong></p>
                                                                </div>
                                                                <div>
                                                                    <NavLink className="pd-view-btn" to="/product" state={{prodId: product._id}}>View Product</NavLink>
                                                                </div>
                                                            </div>
                                                        );
                                                    }    
                                                    }) 
                                                    }</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                            })
                        }

                    </div>
                </div>
            </section>
        </>
    )

}