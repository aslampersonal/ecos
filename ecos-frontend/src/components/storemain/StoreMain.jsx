import React from "react";
import "./StoreMain.css";
import { NavLink } from "react-router-dom";

export default function StoreMain() {
    return (
        <div id="storemain-div">
            <section className="cat-sec">
                <h3 className="sec-h3">LIPS</h3>
                <div className="sec-cat-div">
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Lipstick"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Lipsticks</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Lip Balm"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Lip Balms</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Lip Scrub"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Lip Scrubs</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Lip Mask"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Lip Masks</span>
                    </div>
                </div>
            </section>
            
            <section className="cat-sec">
                <h3 className="sec-h3">HANDS & FEET</h3>
                <div className="sec-cat-div">
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Hand Creams"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Hand Creams</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Foot Creams"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Foot Creams</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Hands & Foot Masks"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Hands & Foot Masks</span>
                    </div>
                </div>
            </section>

            <section className="cat-sec">
                <h3 className="sec-h3">EYES</h3>
                <div className="sec-cat-div">
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Under Eye Cream & Serum"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Under Eye Cream & Serum</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Eye Masks"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Eye Masks</span>
                    </div>
                </div>
            </section>

            <section className="cat-sec">
                <h3 className="sec-h3">SKIN CARE</h3>
                <div className="sec-cat-div">
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Moisturizer"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Moisturizer</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Cleanser"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Cleanser</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Mask"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Mask</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Toner"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Toner</span>
                    </div>
                </div>
            </section>

            <section className="cat-sec">
                <h3 className="sec-h3">BODY CARE</h3>
                <div className="sec-cat-div">
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Lotions & Creams"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Lotions & Creams</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Massage Oils"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Massage Oils</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Shower Gels & Body Wash"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Shower Gels & Body Wash</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Scrubs & Loofahs"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Scrubs & Loofahs</span>
                    </div>
                </div>
            </section>

            <section className="cat-sec">
                <h3 className="sec-h3">HAIR CARE</h3>
                <div className="sec-cat-div">
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Shampoo"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Shampoo</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Conditioner"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Conditioner</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Hair Oil"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Hair Oil</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Hair Serum"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Hair Serum</span>
                    </div>
                    <div className="cat-card">
                        <div className="cat-img-div">
                            <NavLink to="/collections" state= {{title:"Dry Shampoo"}} className="nav-link">
                                <img src="/src/assets/images/eyeshadow-girl1.jpg" />
                            </NavLink>
                        </div>
                        <span>Dry Shampoo</span>
                    </div>
                </div>
            </section>
        </div>
    );
}