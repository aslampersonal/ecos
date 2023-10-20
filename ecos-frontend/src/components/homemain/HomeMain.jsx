import React, { useEffect } from 'react';
import './homemain.css';
import { NavLink } from 'react-router-dom';
import { useCont } from '../../context/MyContext';

function HomeMain () {
    
    const prodData = JSON.parse(localStorage.getItem("fullProducts"));

    useEffect(() => {
        var counter = 1;
        const bannerInterval = setInterval(() => {
            document.getElementById('bnr-changer' + counter).checked = true;
            counter++;
            if(counter > 4) {
            counter = 1;
            }
        }, 5000);

        return () => {
            clearInterval(bannerInterval);
        }

    }, []);
    
    return (
        <>
            <section id="mbanner-section">
                <div className="mbanner-div">
                    <div className="mbanner-div1">
                        {/* banner slider button */}
                        <input type="radio" name="radio-btn" id="bnr-changer1" />
                        <input type="radio" name="radio-btn" id="bnr-changer2" />
                        <input type="radio" name="radio-btn" id="bnr-changer3" />
                        <input type="radio" name="radio-btn" id="bnr-changer4" />
                        {/* banner images */}
                        <div className="mySlides first">
                            <img src="/src/assets/images/banners/main-banner1.jpg" className="b-img" alt='' />
                        </div>
                        <div className="mySlides">
                            <NavLink to="/collections" state= {{title:"haircare"}}>
                            <img src="/src/assets/images/banners/main-banner2.jpg" className="b-img" alt='' />
                            <button className='b-shop-btn'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        <div className="mySlides">
                            <NavLink to="/collections" state= {{title:"face"}}>
                            <img src="/src/assets/images/banners/main-banner3.jpg" className="b-img" alt='' />
                            <button className='b-shop-btn'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        <div className="mySlides">
                            <NavLink to="/collections" state= {{title:"lips"}}>
                            <img src="/src/assets/images/banners/main-banner4.jpg" className="b-img" alt='' />
                            <button className='b-shop-btn'>SHOP NOW</button>
                            </NavLink>
                        </div>
                        {/* automatic navigation */}
                        <div className="navigation-auto">
                            <div className="auto-btn1" />
                            <div className="auto-btn2" />
                            <div className="auto-btn3" />
                            <div className="auto-btn4" />
                        </div>
                        {/* manual navigation */}
                        <div className="navigation-manual">
                            <label htmlFor="bnr-changer1" className="manual-btn" />
                            <label htmlFor="bnr-changer2" className="manual-btn" />
                            <label htmlFor="bnr-changer3" className="manual-btn" />
                            <label htmlFor="bnr-changer4" className="manual-btn" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="section2">
                <h2>Super value deals</h2>
                <h1>On Body Care products</h1>
                <p>Save more with coupons & up to 70% off! </p>
                <NavLink to="/collections" state= {{title:"bodycare"}}><button>Shop Now</button></NavLink>
            </section>

            <section id="category-section">
                <div id="cat-makeup-div">
                    <div id="cat-makeup-div-div">
                        <h2 id="cat-makeup-h2">Face Care products</h2>
                        <NavLink to="/collections" state= {{title:"face"}}>
                            <button href="./product.html" className="btn btn-light" id="cat-makeup-btn">
                            SHOP NOW
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div id="cat-skin-div">
                    <div id="cat-skin-div-div">
                        <h2 id="cat-skin-h2">skincare products</h2>
                        <NavLink to="/collections" state= {{title:"skincare"}}>
                            <button className="btn btn-dark" id="cat-skin-btn" href="./product.html">
                            SHOP NOW
                            </button>
                        </NavLink>
                    </div>
                </div>
            </section>
            <section id="scroll-banner-section">
                <div id="scroll-banner-div">
                    <div id="sb-h-div">
                        <h2
                        style={{
                            color: "#6d9962",
                            fontWeight: 400,
                            letterSpacing: 5,
                            fontSize: 45,
                            fontFamily: '"Nova Flat"'
                        }}
                        >
                        #UCOS
                        </h2>
                    </div>
                    <div id="sb-b-div">
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/facecare-lady.png" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/men-bearedcare.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/girlface-lipstick.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/men-skincare1.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt='' />
                        </div>
                    </div>
                </div>
            </section>

            <section id="banner3-section">
                <div id="banner3-div">
                    <div id="b3-leftb">
                        <img id="b3-left-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt='' />
                    </div>
                    <div id="b3-center">
                        <h2 id="b3-center-h2">BEAUTIFUL. GLAMOROUS. RADIANT.</h2>
                        <NavLink to="/collections" state= {{title:"eyeshadow"}} className="btn btn-light" id="b3-center-btn">
                        SHOP EYE SHADOWS
                        </NavLink>
                    </div>
                    <div id="b3-rightb">
                        <img id="b3-right-img" src="/src/assets/images/eye-shadow2.jpg" alt='' />
                    </div>
                </div>
            </section>

            <section id="product-bnr2-sec">
                <div id="prod-bnr2-div">
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[0]._id}} className="prod-div-nav">
                        <img src={prodData[0].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[1]._id}} className="prod-div-nav">
                        <img src={prodData[1].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[2]._id}} className="prod-div-nav">
                        <img src={prodData[2].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[3]._id}} className="prod-div-nav">
                        <img src={prodData[3].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                    <div className="prod-div">
                        <NavLink to="/product" state={{prodId: prodData[4]._id}} className="prod-div-nav">
                        <img src={prodData[4].image} className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                        </NavLink>
                    </div>
                </div>
                <div id="prod-bnr2-btn-div">
                    <NavLink id="prod-bnr2-btn" className="btn btn-dark" to="/store">
                        SHOP ALL
                    </NavLink>
                </div>
            </section>
        </>

    );
}

export default React.memo(HomeMain);