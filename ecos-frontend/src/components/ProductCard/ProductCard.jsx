import React, { useContext, useState } from 'react';
import "./ProductCard.css"
import { IoIosArrowDropdown, IoIosPricetag } from "react-icons/io"
import { BsFillCartPlusFill } from "react-icons/bs"

import { useCont } from '../../context/MyContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Toast from '../Toast/Toast';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ProductCard (props) {

    const path = props.loc;
    const { cart, setCart, user, prodData } = useCont();
    const navigate = useNavigate();

    let productList = prodData;
    if (path === "lips") {
        productList = prodData.filter((prod) => 
        prod.category == "Lipstick" || 
        prod.category === "Lip Balm" || 
        prod.category === "Lip Scrub" || 
        prod.category === "Lip Mask" 
        );
    } else if(path === "hands & feet") {
        productList = prodData.filter((prod) => 
        prod.category == "Hand Creams" || 
        prod.category === "Foot Creams" || 
        prod.category === "Hands & Foot Masks" 
        );
    } else if (path === "eyes") {
        productList = prodData.filter((prod) => 
        prod.category == "Under Eye Cream & Serum" || 
        prod.category === "Eye Masks"
        );
    } else if (path === "skincare") {
        productList = prodData.filter((prod) => 
        prod.category == "Moisturizer" || 
        prod.category === "Cleanser" || 
        prod.category === "Mask" || 
        prod.category === "Toner" 
        );
    } else if (path === "bodycare") {
        productList = prodData.filter((prod) => 
        prod.category == "Lotions & Creams" || 
        prod.category === "Massage Oils" || 
        prod.category === "Shower Gels & Body Wash" || 
        prod.category === "Scrubs & Loofahs" 
        );
    } else if (path === "haircare") {
        productList = prodData.filter((prod) => 
        prod.category == "Shampoo" || 
        prod.category === "Conditioner" || 
        prod.category === "Hair Oil" || 
        prod.category === "Hair Serum" ||
        prod.category === "Dry Shampoo" 
        );
    } else {
        productList = prodData.filter((prod) => prod.category == path );
    }

    useEffect(() => {
        if(prodData) {
            localStorage.setItem("productData", JSON.stringify(productList));
        }
    }, [productList]);

    const [sorted, sortProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Latest items');

    function sortChange(event) {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);

        if (selectedValue === "Name") {
            productList.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (selectedValue === "Cheapest") {
            productList.sort((a, b) => a.title.localeCompare(b.title) || a.price - b.price);
        }
        // sortProducts(productList);
        console.log(productList);
    }

    async function addToCart(id) {
        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
            try {
                const response = await axios.post(`http://localhost:3000/api/users/products/cart/${id}`,
                {id: id},
                {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${jwtToken}`,
                    },
                    withCredentials: true 
                });
                console.log(response.data.message);
                
            } catch (error) {
                console.error('Error adding to cart:', error);
            }            
        } else {
            const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
            localStorage.setItem("cart", JSON.stringify([...cart, id]));
        }
        window.location.reload();
    }

    return(
        <section id="main-section" className="col-9">
            {/* notification toasts */}
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                <Toast show={showToast} type="error" message="Login to order your products" />
            </div>
            <header className="border-bottom mb-4 pb-3">
                <div className="form-inline" id='sort-main-div'>
                    <span className="mr-md-auto" style={{fontWeight: "600"}}>{productList.length} Items found </span>
                    <div id='sort-div'>
                        <span style={{marginRight: "1rem", fontWeight: "600"}}>Sort By:</span>
                        <select className="form-control" id='sort-select' value={selectedOption} onChange={sortChange}>
                            <option>Latest items</option>
                            <option>Name</option>
                            <option>Cheapest</option>
                        </select>
                    </div>
                </div>
            </header>
            
            <div className='card-row'>
                {productList.map((prodData) => {
                    return (
                        <div className='card-main-div' key={prodData._id}>
                            <form>
                            <figure className="prod-card">
                                <NavLink to="/product" state={{prodId: prodData._id}} className="nav-link">
                                    <div className="img-wrap"> 
                                        <img src={prodData.image} />
                                    </div>
                                </NavLink> 
                                <figcaption className="info-wrap">
                                    <span className="pd-title">{prodData.title}</span>
                                    <div className='price-div'>
                                        <div className='price-tag-div'>
                                            <IoIosPricetag className='price-tag' />
                                            <span className="price">{prodData.price}</span>
                                        </div>
                                        <button type='button' className="cart-btn" onClick={() => addToCart(prodData._id)}><BsFillCartPlusFill className='cart-icon'/></button>
                                    </div>
                                </figcaption>
                            </figure>
                            </form>
                        </div>
                    )
                })}
            </div>

        </section> 
    );
}
