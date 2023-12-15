import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi"

import ProductCard from "../ProductCard/ProductCard";
import "./ProductCollection.css"


export default function ProductCollection() {

    const a = useLocation();
    let loc = "Collections";
    if(a.state !== null) {
        loc = a.state.title;
    }

    return (
    <>
        <section className="section-pagetop bg" id="first-sec">
            <div className="container" id="head-sec-div">
                <h2 className="title-page">{loc}</h2>
                <nav>
                    <ol className="breadcrumb text-white">
                        <li className="breadcrumb-item"><NavLink to="/" className="link-dark link-underline-opacity-0">Home</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/store" className="link-dark link-underline-opacity-0">Store</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{loc}</li>
                    </ol>  
                </nav>
            </div> 
        </section>
        
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <aside className="col-3">
                        <div className="card">
                            
                            <article className="filter-group">
                                <header className="card-header">
                                    <button data-toggle="collapse" type="button" data-target="#collapse_1" aria-expanded="false" aria-controls="#collapse_1" className="link-dark link-underline-opacity-0">
                                        {/* <MdKeyboardArrowDown className="pd-icons" /> */}
                                        <h6 className="title">Product type</h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_1">
                                    <div className="card-body">
                                        <form className="pb-3">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search" />
                                                <button className="btn btn-light" id="search-btn" type="button"><BiSearchAlt className="pd-icons" /></button>
                                            </div>
                                        </form>
                                        <ul className="list-menu">
                                            <li><a href="#" className="link-dark link-underline-opacity-0">Skin Care</a></li>
                                            <li><a href="#" className="link-dark link-underline-opacity-0">Face Care</a></li>
                                            <li><a href="#" className="link-dark link-underline-opacity-0">Body Care</a></li>
                                            <li><a href="#" className="link-dark link-underline-opacity-0">Cosmetics for Men</a></li>
                                            <li><a href="#" className="link-dark link-underline-opacity-0">Cosmetics for Women</a></li>
                                        </ul>
                                    </div> 
                                </div>
                            </article>

                            <article className="filter-group">
                                <header className="card-header">
                                    <button href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                        {/* <MdKeyboardArrowDown className="pd-icons" /> */}
                                        <h6 className="title">Brands </h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_2">
                                    <div className="card-body">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Mercedes  
                                                <b className="badge badge-pill badge-light float-right">120</b>  </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Toyota 
                                                <b className="badge badge-pill badge-light float-right">15</b>  </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Mitsubishi 
                                                <b className="badge badge-pill badge-light float-right">35</b> </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Nissan 
                                                <b className="badge badge-pill badge-light float-right">89</b> </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Honda 
                                                <b className="badge badge-pill badge-light float-right">30</b>  </div>
                                        </label>
                                    </div> 
                                </div>
                            </article>

                            <article className="filter-group">
                                <header className="card-header">
                                    <button href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                        {/* <MdKeyboardArrowDown className="pd-icons" /> */}
                                        <h6 className="title">Price range </h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_3">
                                    <div className="card-body">
                                        <input type="range" className="custom-range" min="0" max="100" name="" />
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Min</label>
                                            <input className="form-control" placeholder="$0" type="number" />
                                        </div>
                                        <div className="form-group text-right col-md-6">
                                            <label>Max</label>
                                            <input className="form-control" placeholder="$1,0000" type="number" />
                                        </div>
                                        </div> 
                                        <button className="btn btn-block btn-primary">Apply</button>
                                    </div>
                                </div>
                            </article> 

                            <article className="filter-group">
                                <header className="card-header">
                                    <button href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                        {/* <MdKeyboardArrowDown className="pd-icons" /> */}
                                        <h6 className="title">Sizes </h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_4">
                                    <div className="card-body">
                                        <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> XS </span>
                                        </label>
                
                                        <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> SM </span>
                                        </label>
                
                                        <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> LG </span>
                                        </label>
                
                                        <label className="checkbox-btn">
                                        <input type="checkbox" />
                                        <span className="btn btn-light"> XXL </span>
                                        </label>
                                    </div>
                                </div>
                            </article> 
                        </div> 
    
                    </aside> 
                        
                    {
                        <ProductCard loc={loc}/>
                    }
  
                </div>
            </div> 
        </section>
    </>
    );
  }
  