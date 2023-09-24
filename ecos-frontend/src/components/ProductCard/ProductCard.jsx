import React, { useContext } from 'react';
import "./ProductCard.css"
import { IoIosPricetag } from "react-icons/io"
import { BsFillCartPlusFill } from "react-icons/bs"

import MyContext from '../../context/MyContext';
import { NavLink } from 'react-router-dom';

export default function ProductCard (props) {

    const path = props.loc;
    const product = useContext(MyContext);
    const {prodData} = product;
    let productList = prodData;
    if (path !== "Collections") {
        productList = prodData.filter((prod) => prod.category == path);
    }

    return(
        <section id="main-section" className="col-9">
    
            <header className="border-bottom mb-4 pb-3">
                <div className="form-inline">
                    <span className="mr-md-auto">{productList.length} Items found </span>
                    <select className="mr-2 form-control">
                        <option>Latest items</option>
                        <option>Trending</option>
                        <option>Most Popular</option>
                        <option>Cheapest</option>
                    </select>
                    <div className="btn-group">
                        <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view"> 
                            <i className="fa fa-bars"></i></a>
                        <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view"> 
                            <i className="fa fa-th"></i></a>
                    </div>
                </div>
            </header>
            
            <div className='card-row'>
                {productList.map((prodData) => {
                        return (
                            
                            <div className='card-main-div' key={prodData._id}>
                                <figure className="prod-card">
                                    <NavLink to={"/product:id"} state={{prodId: prodData._id}} className="nav-link">
                                        <div className="img-wrap"> 
                                            <span className="badge badge-danger"> NEW </span>
                                            <img src={prodData.image} />
                                        </div>
                                    </NavLink> 
                                    <figcaption className="info-wrap">
                                        <span className="title">{prodData.title}</span>
                                        <div className='price-div'>
                                            <div className='price-tag-div'>
                                                <IoIosPricetag className='price-tag' />
                                                <span className="price">{prodData.price}</span>
                                            </div>
                                            <button type='button' className="cart-btn"><BsFillCartPlusFill className='cart-icon'/></button>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                            
                        )
                    })}
            </div>

            {/* <nav className="mt-4" id='page-nav' aria-label="Page navigation sample">
                <ul className="pagination">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav> */}

        </section> 
    );
}
