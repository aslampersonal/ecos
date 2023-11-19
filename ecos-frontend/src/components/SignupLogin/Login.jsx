import React, { useContext } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";

import { FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCont } from '../../context/MyContext';
import Toast from "../Toast/Toast";

export default function SignInForm (props) {

    useEffect(() => {
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken) {
            navigate("/");
          }
    }, []);

    const { cart, setCart, token, setToken, user, setUser } = useCont();
    const { login } = useAuth();

    const [formdata, setFormData] = useState({ email: "", password: "" })
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', document.getElementById("l-email").value);
        formData.append('password', document.getElementById("l-password").value);

        if(document.getElementById("l-email").value === "admin@gmail.com") {
            try {
                const response = await axios.post('http://localhost:3000/api/admin/login', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });

                if (response.status >= 200 && response.status < 300 && response.data.cookie) {

                    const jwtToken = response.data.cookie;
                    
                    // Set the token as an HTTP-only cookie
                    Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });

                    // Store the token in state for application use
                    setToken(jwtToken);
                    
                    const decodedToken = jwt_decode(jwtToken);
                    setUser(decodedToken);
                    
                } else {
                    console.log('Unable to find Cookies');
                }
            
                login();
                if (localStorage.getItem("cart") !== "null") {
                    localStorage.removeItem("cart");
                }
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
                setTimeout(() => {
                    navigate("/admin");
                }, 2000);

              } catch (error) {
                console.error('Error login to Admin:', error);
                alert("Error Login!!!");
              } 
        } else {
            try {
                const response = await axios.post('http://localhost:3000/api/users/login', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });

                if (response.status >= 200 && response.status < 300 && response.data.cookie) {

                    const jwtToken = response.data.cookie;
                    
                    // Set the token as an HTTP-only cookie
                    Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });

                    // Store the token in state for application use
                    setToken(jwtToken);
                    
                    const decodedToken = jwt_decode(jwtToken);
                    setUser(decodedToken);
                    setCart(decodedToken.cart);
                    
                } else {
                console.log('Unable to find Cookies');
                }
            
                login();
                if (localStorage.getItem("cart").length) {
                    addToCart();
                }
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
                setTimeout(() => {
                    navigate(-1);
                }, 2000);

              } catch (error) {
                console.error('Error login:', error);
                alert(error);
              }
        }

        //add to cart from local storage while a user logged in
        async function addToCart() {

            const jwtToken = Cookies.get("jwtToken");
            const localCart = JSON.parse(localStorage.getItem("cart"));

            for(let i=0; i<localCart.length; i++) {
                try {
                    const response = await axios.post(`http://localhost:3000/api/users/products/cart/${localCart[i]}`,
                    {id: localCart[i]}, 
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
            }

            localStorage.removeItem("cart");
            
        }

    }

  return (
    
    <div className="form-container sign-in-container">
      {/* notification toasts */}
      <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
        <Toast show={showToast} type="success" message="Logged in successfully" />
      </div>
      <form onSubmit={handleSubmit} className="ls-form">
        <h1 className="ls-h1">Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebook className="social-i" />
          </a>
          <a href="#" className="social">
            <FaGoogle className="social-i" />
          </a>
          <a href="#" className="social">
            <FaLinkedin className="social-i" />
          </a>
        </div>
        <span className="ls-span">or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="l-email"
          onChange={handleChange}
          className="ls-input"
        />
        <input
          type="password"
          name="password"
          id="l-password"
          placeholder="Password"
          onChange={handleChange}
          className="ls-input"
        />
        <a href="#" className="ls-a">Forgot your password?</a>
        <button type="submit" className="ls-btn">Sign In</button>
      </form>
    </div>
  );
}



// import React, { useContext } from "react";
// import axios from "axios";
// import Cookies from 'js-cookie';
// import jwt_decode from "jwt-decode";
// import { useState, useEffect } from "react";

// import { FaFacebook, FaTwitter, FaLinkedin, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { useLocation, useNavigate } from "react-router-dom";

// import { useAuth } from "../../context/AuthContext";
// import { useCont } from '../../context/MyContext';
// import "./Login.css"
// import Toast from "../Toast/Toast";

// export default function Login (props) {

//     useEffect(() => {
//         const jwtToken = Cookies.get('jwt');
//         if (jwtToken) {
//             navigate("/");
//           }
//     }, []);

//     const { cart, setCart, token, setToken, user, setUser } = useCont();
//     const { login } = useAuth();

//     const [formdata, setFormData] = useState({ email: "", password: "" })
//     const [errors, setErrors] = useState({})
//     const [showToast, setShowToast] = useState(false);

//     const navigate = useNavigate();

//     function handleChange(e) {
//         const {name, value} = e.target;
//         setFormData({...formdata, [name] : value})
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         const validationErrors = {}

//         if(!formdata.email.trim()) {
//             validationErrors.email = "email is required"
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formdata.email)) {
//             validationErrors.email = "email is not valid"
//         }

//         if(!formdata.password.trim()) {
//             validationErrors.password = "password is required"
//         } else if (formdata.password.length < 6) {
//             validationErrors.password = "password should be at least 6 char"
//         }

//         setErrors(validationErrors);

//         if(Object.keys(validationErrors).length === 0) {
//             const formData = new FormData();
//             formData.append('email', document.getElementById("email").value);
//             formData.append('password', document.getElementById("password").value);

//             if(document.getElementById("email").value === "admin@gmail.com") {
//                 try {
//                     const response = await axios.post('http://localhost:3000/api/admin/login', formData, {
//                         headers: {
//                           'Content-Type': 'application/json', // or 'application/json' if needed
//                         },
//                     });
    
//                     if (response.status >= 200 && response.status < 300 && response.data.cookie) {
    
//                         const jwtToken = response.data.cookie;
                        
//                         // Set the token as an HTTP-only cookie
//                         Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });
    
//                         // Store the token in state for application use
//                         setToken(jwtToken);
                        
//                         const decodedToken = jwt_decode(jwtToken);
//                         setUser(decodedToken);
                        
//                     } else {
//                         console.log('Unable to find Cookies');
//                     }
                
//                     login();
//                     if (localStorage.getItem("cart") !== "null") {
//                         localStorage.removeItem("cart");
//                     }
//                     setShowToast(true);
//                     setTimeout(() => {
//                         setShowToast(false);
//                     }, 2000);
//                     setTimeout(() => {
//                         navigate("/admin");
//                     }, 2000);
    
//                   } catch (error) {
//                     console.error('Error login to Admin:', error);
//                     alert("Error Login!!!");
//                   } 
//             } else {
//                 try {
//                     const response = await axios.post('http://localhost:3000/api/users/login', formData, {
//                         headers: {
//                           'Content-Type': 'application/json', // or 'application/json' if needed
//                         },
//                     });
    
//                     if (response.status >= 200 && response.status < 300 && response.data.cookie) {
    
//                         const jwtToken = response.data.cookie;
                        
//                         // Set the token as an HTTP-only cookie
//                         Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 , path: '/', secure: false, sameSite: 'strict' });
    
//                         // Store the token in state for application use
//                         setToken(jwtToken);
                        
//                         const decodedToken = jwt_decode(jwtToken);
//                         setUser(decodedToken);
//                         setCart(decodedToken.cart);
                        
//                     } else {
//                     console.log('Unable to find Cookies');
//                     }
                
//                     login();
//                     if (localStorage.getItem("cart") === "null") {
//                         addToCart();
//                     }
//                     setShowToast(true);
//                     setTimeout(() => {
//                         setShowToast(false);
//                     }, 2000);
//                     setTimeout(() => {
//                         navigate(-1);
//                     }, 2000);
    
//                   } catch (error) {
//                     console.error('Error login:', error);
//                     alert(error.response.data.error);
//                   }
//             }
//         }

//         async function addToCart() {

//             const jwtToken = Cookies.get("jwtToken");
//             const localCart = JSON.parse(localStorage.getItem("cart"));

//             for(let i=0; i<localCart.length; i++) {
//                 try {
//                     const response = await axios.post(`http://localhost:3000/api/users/products/cart/${localCart[i]}`,
//                     {id: localCart[i]}, 
//                     {
//                         headers: {
//                           'Content-Type': 'application/json',
//                           Authorization: `Bearer ${jwtToken}`,
//                         },
//                         withCredentials: true 
//                     });
//                     console.log(response.data.message);
                    
//                 } catch (error) {
//                     console.error('Error adding to cart:', error);
//                 }
//             }

//             localStorage.removeItem("cart");
            
//         }

//     }
    
//     return (
//         <>
//             {/* notification toasts */}
//             <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
//                 <Toast show={showToast} type="success" message="Logged in successfully" />
//             </div>
//             <section className="login-section">
//                     <div className="login-main-div">
//                         <div className="left-div">
//                             <img
//                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//                             className="img-fluid"
//                             alt="Sample image"
//                             />
//                         </div>
//                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//                             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color: "rgb(37, 53, 76)"}}>
//                                 LOGIN
//                             </p>
//                             <form onSubmit={handleSubmit} id="login-form" noValidate>
//                                 {/* <div className="d-flex flex-row align-items-center justify-content-center">
//                                     <p className="lead fw-normal mb-0 me-3">Sign in with</p>
//                                     <FaFacebook className="social-icons">
                                        
//                                     </FaFacebook>
//                                     <FaTwitter className="social-icons">

//                                     </FaTwitter>
//                                     <FaLinkedin className="social-icons">

//                                     </FaLinkedin>
//                                 </div>
//                                 <div className="divider d-flex align-items-center justify-content-center my-4">
//                                     <p className="text-center fw-bold mx-3 mb-0">Or</p>
//                                 </div> */}

//                                 <div className="inputs-div">
//                                     <div className="icons-div">
//                                         <MdEmail className="icons" />
//                                         <div className="form-floating">
//                                             <input
//                                                 onChange={handleChange}
//                                                 type="email"
//                                                 id="email"
//                                                 name="email"
//                                                 className="form-control"
//                                                 placeholder="E-mail address"
//                                             />
//                                             <label className="form-label">E-mail address</label>
//                                         </div>
//                                     </div>
//                                     <div className="error-div">
//                                         {errors.email && <span className="error-span">{errors.email}</span>}
//                                     </div>
//                                 </div>
//                                 <div className="inputs-div">
//                                     <div className="icons-div">
//                                         <FaLock className="icons" />
//                                         <div className="form-floating">
//                                             <input
//                                                 onChange={handleChange}
//                                                 type="password"
//                                                 id="password"
//                                                 name="password"
//                                                 className="form-control"
//                                                 placeholder="Password"
//                                             />
//                                             <label className="form-label">Password</label>
//                                         </div>
//                                     </div>
//                                     <div className="error-div">
//                                         {errors.password && <span className="error-span">{errors.password}</span>}
//                                     </div>
//                                 </div>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     {/* Checkbox */}
//                                     <div className="form-check mb-0">
//                                         <input
//                                             className="form-check-input me-2"
//                                             type="checkbox"
//                                             defaultValue=""
//                                             id="form2Example3"
//                                         />
//                                         <label className="form-check-label" htmlFor="form2Example3">
//                                             Remember me
//                                         </label>
//                                     </div>
//                                     <a href="#!" id="frgt-pswrd">
//                                     Forgot password?
//                                     </a>
//                                 </div>
//                                 <div className="text-center text-lg-start mt-4 pt-2" id="login-btn-div">
//                                     <button
//                                     type="submit"
//                                     className="btn btn-primary btn-lg"
//                                     id="login-btn"
//                                     >
//                                     Login
//                                     </button>
//                                     <p className="small fw-bold mt-2 pt-1 mb-0">
//                                     Don't have an account?{" "}
//                                         <a href="/signup" className="link-danger" style={{textDecoration: "none"}}>
//                                             Register
//                                         </a>
//                                     </p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//             </section>

//         </>
//     );
// }