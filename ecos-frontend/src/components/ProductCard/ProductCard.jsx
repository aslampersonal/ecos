import React, { useContext, useState } from 'react';
import "./ProductCard.css"
import { IoIosArrowDropdown, IoIosPricetag } from "react-icons/io"
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

    const [sorted, sortProducts] = useState([]);

    function sortChange() {
        productList.forEach(element => {
            sortProducts([...sorted, element]);
            console.log(element);
        });
        // sortProducts(productList);
        console.log(sorted);
    }

    return(
        <section id="main-section" className="col-9">
    
            <header className="border-bottom mb-4 pb-3">
                <div className="form-inline" id='sort-main-div'>
                    <span className="mr-md-auto" style={{fontWeight: "600"}}>{productList.length} Items found </span>
                    <div id='sort-div'>
                        <span style={{marginRight: "1rem", fontWeight: "600"}}>Sort By:</span>
                        <select className="form-control" id='sort-select' onChange={sortChange}>
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
