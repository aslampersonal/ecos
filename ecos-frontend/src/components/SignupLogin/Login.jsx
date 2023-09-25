import React, { useContext } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaLinkedin, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./Login.css"
import { useState } from "react";

export default function Login (props) {
        
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = {}

        if(!formdata.email.trim()) {
            validationErrors.email = "email is required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formdata.email)) {
            validationErrors.email = "email is not valid"
        }

        if(!formdata.password.trim()) {
            validationErrors.password = "password is required"
        } else if (formdata.password.length < 6) {
            validationErrors.password = "password should be at least 6 char"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append('email', document.getElementById("email").value);
            formData.append('password', document.getElementById("password").value);

            try {
                const response = await axios.post('http://localhost:3000/api/users/login', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });
                console.log(response.data);
                
                navigate("/");

              } catch (error) {
                console.error('Error login:', error);
                alert(error.response.data.error);
              }
        }

    }
    
    return (
        <>
            <section className="login-section">
                    <div className="login-main-div">
                        <div className="left-div">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color: "rgb(37, 53, 76)"}}>
                                LOGIN
                            </p>
                            <form onSubmit={handleSubmit} id="login-form" noValidate>
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <FaFacebook className="social-icons">
                                        
                                    </FaFacebook>
                                    <FaTwitter className="social-icons">

                                    </FaTwitter>
                                    <FaLinkedin className="social-icons">

                                    </FaLinkedin>
                                </div>
                                <div className="divider d-flex align-items-center justify-content-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>
                                <div className="inputs-div">
                                    <div className="icons-div">
                                        <MdEmail className="icons" />
                                        <input
                                            onChange={handleChange}
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="E-mail address"
                                        />
                                    </div>
                                    <div className="error-div">
                                        {errors.email && <span className="error-span">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="inputs-div">
                                    <div className="icons-div">
                                        <FaLock className="icons" />
                                        <input
                                            onChange={handleChange}
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="error-div">
                                        {errors.password && <span className="error-span">{errors.password}</span>}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Checkbox */}
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            defaultValue=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" id="frgt-pswrd">
                                    Forgot password?
                                    </a>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2" id="login-btn-div">
                                    <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    id="login-btn"
                                    >
                                    Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <a href="/signup" className="link-danger" style={{textDecoration: "none"}}>
                                        Register
                                    </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
            </section>

        </>
    );
}