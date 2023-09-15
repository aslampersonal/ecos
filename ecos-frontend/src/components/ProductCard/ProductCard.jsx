import React from 'react';
import "./ProductCard.css"
import { FaSearchPlus } from "react-icons/fa"

export default function ProductCard () {

return(
    <div className="col-md-4" key={product.id}>
        <figure className="card card-product-grid">
            <div className="img-wrap"> 
                <span className="badge badge-danger"> NEW </span>
                <img src={product.image} />
                <a className="btn-overlay" href="#"><FaSearchPlus /> Quick view</a>
            </div> 
            <figcaption className="info-wrap">
                <div className="fix-height">
                    <a href="#" className="title">{product.name}</a>
                    <div className="price-wrap mt-2">
                        <span className="price">{product.price}</span>
                    </div>
                </div>
                <a href="#" className="btn btn-block btn-primary">Add to cart</a>
            </figcaption>
        </figure>
    </div> 
);
}
