import React, { useEffect } from "react";
import "./productCollection.css"
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md"
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductCollection() {
    
    let productdata = [];

    useEffect(() => {

        productdata = getData();

    });
    console.log(productdata);


    async function getData() {
        var data = await axios.get('http://localhost:3000/get-product')
        return data.data;
    }

    async function showData() {
        const Data = await getData();

        for(let i=0; i<Data.length; i++) {
            // for(let j=0; j<Data[i].Images.length; j++) {
            //     const pdimg = document.createElement("img");
            //     const imgurl = "../images/product-images/" + Data[i].Images[j];
            //     pdimg.setAttribute("class","prod-scroll-img");
            //     pdimg.setAttribute("src",imgurl);
            //     imgscrolldiv.appendChild(pdimg);
            // }

            // const mainImgurl = "../images/product-images/" + Data[0].Images[0];
            // mainimage.setAttribute("src",mainImgurl);

            const name = Data[i].name;
            const description = Data[i].description;
            const price = Data[i].price;

        }
    }
    
    return (
      <>
          <section className="section-pagetop bg" id="first-sec">
            <div className="container" id="head-sec-div">
                <h2 className="title-page">Skincare Products</h2>
                <nav>
                    <ol className="breadcrumb text-white">
                        <li className="breadcrumb-item"><NavLink to="/" className="link-dark link-underline-opacity-0">Home</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/store" className="link-dark link-underline-opacity-0">Store</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Products</li>
                    </ol>  
                </nav>
            </div> 
          </section>
        
          <section className="section-content padding-y">
          <div className="container">
  
            <div className="row">
                <aside className="col-md-3">
                    <div className="card">
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                    <MdKeyboardArrowDown />
                                    <h6 className="title">Product type</h6>
                                </a>
                            </header>
                            <div className="filter-content collapse show" id="collapse_1">
                                <div className="card-body">
                                    <form className="pb-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search" />
                                        <div className="input-group-append">
                                        <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                    </form>
                                    
                                    <ul className="list-menu">
                                    <li><a href="#" className="link-dark link-underline-opacity-0">People  </a></li>
                                    <li><a href="#" className="link-dark link-underline-opacity-0">Watches </a></li>
                                    <li><a href="#" className="link-dark link-underline-opacity-0">Cinema  </a></li>
                                    <li><a href="#" className="link-dark link-underline-opacity-0">Clothes  </a></li>
                                    <li><a href="#" className="link-dark link-underline-opacity-0">Home items </a></li>
                                    <li><a href="#" className="link-dark link-underline-opacity-0">Animals</a></li>
                                    <li><a href="#" className="link-dark link-underline-opacity-0">People </a></li>
                                    </ul>
            
                                </div> 
                            </div>
                        </article>
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                    <i className="icon-control fa fa-chevron-down"></i>
                                    <h6 className="title">Brands </h6>
                                </a>
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
                                <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                                    <i className="icon-control fa fa-chevron-down"></i>
                                    <h6 className="title">Price range </h6>
                                </a>
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
                                <a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="">
                                    <i className="icon-control fa fa-chevron-down"></i>
                                    <h6 className="title">Sizes </h6>
                                </a>
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
                        <article className="filter-group">
                            <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" className="">
                                    <i className="icon-control fa fa-chevron-down"></i>
                                    <h6 className="title">More filter </h6>
                                </a>
                            </header>
                            <div className="filter-content collapse in" id="collapse_5">
                                <div className="card-body">
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Any condition</div>
                                    </label>
            
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Brand new </div>
                                    </label>
            
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Used items</div>
                                    </label>
            
                                    <label className="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                        <div className="custom-control-label">Very old</div>
                                    </label>
                                </div>
                            </div>
                        </article> 
                    </div> 
  
                </aside> 


            <section id="main-section" className="col-md-9">
  
                <header className="border-bottom mb-4 pb-3">
                    <div className="form-inline">
                        <span className="mr-md-auto">32 Items found </span>
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
  
                <div className="row">
                    <div>{productdata}</div>
                    {
                            productdata.map(product => {
                                console.log(product.id);
                                <ProductCard key={product.id} {...product} />
                            })
                    }

                    {/* <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <span className="badge badge-danger"> NEW </span>
                                <img src="assets/images/items/1.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Great item name goes here</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                        <del className="price-old">$1980</del>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>
                            </figcaption>
                        </figure>
                    </div> 
        
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/2.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div>
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div> 
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div> 
        
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/3.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div> 
        
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/4.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div> 
        
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/5.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div> 
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div> 
        
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/6.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div> 
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div> 
        
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/7.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div> 
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div> 
                    <div className="col-md-4">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                                <img src="assets/images/items/1.jpg" />
                                <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a>
                            </div> 
                            <figcaption className="info-wrap">
                                <div className="fix-height">
                                    <a href="#" className="title">Product name goes here just for demo item</a>
                                    <div className="price-wrap mt-2">
                                        <span className="price">$1280</span>
                                    </div> 
                                </div>
                                <a href="#" className="btn btn-block btn-primary">Add to cart </a>  
                            </figcaption>
                        </figure>
                    </div>  */}
                </div> 
  
  
                <nav className="mt-4" aria-label="Page navigation sample">
                    <ul className="pagination">
                    <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
  
              </section>
  
          </div>
  
          </div> 
          </section>
      </>
    );
  }
  