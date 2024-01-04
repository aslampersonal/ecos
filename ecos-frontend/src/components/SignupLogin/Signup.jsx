import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import { FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

export default function SignUpForm () {
    
  useEffect (() => {
        const jwtToken = Cookies.get('jwt');
        if (jwtToken) {
            navigate("/");
          }

    }, []);

    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        username: "",
        fullname: "",
        mobile: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formdata, [name] : value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = {}

        // if(!document.getElementById("terms-conditions").checked) {
        //     validationErrors.terms = "You should agree the terms and conditions"
        // }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append('username', document.getElementById("username").value);
            formData.append('email', document.getElementById("email").value);
            formData.append('password', document.getElementById("password").value);
            formData.append('confirmpassword', document.getElementById("confirmpassword").value);

            try {
                const response = await axios.post('http://localhost:3000/api/users/register', formData, {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });
                console.log(response.data.message);
                
                window.location.reload();

              } catch (error) {
                console.error('Error registering the user', error);
              }
        }

    }

  return (

    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit} className="ls-form">
        <h1 className="ls-h1">Create Account</h1>
        {/* <div className="social-container">
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
        <span className="ls-span">or use your email for registration</span> */}
        <div className="social-container"></div>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          placeholder="User Name"
          className="ls-input"
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
          className="ls-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          className="ls-input"
        />
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          onChange={handleChange}
          placeholder="Repeat Password"
          className="ls-input"
        />
        <button type="submit" className="ls-btn">Sign Up</button>
      </form>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from 'js-cookie';

// import { FaUserAlt, FaLock, FaKey } from "react-icons/fa";
// import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
// import { TbReload } from "react-icons/tb";
// import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

// import "./Signup.css"
// import { AiFillMobile } from "react-icons/ai";

// export default function Signup () {

//     useEffect (() => {
//         const jwtToken = Cookies.get('jwt');
//         if (jwtToken) {
//             navigate("/");
//           }

//         loadCaptchaEnginge(5, "grey");
//     }, []);

//     const navigate = useNavigate();

//     const [formdata, setFormData] = useState({
//         username: "",
//         fullname: "",
//         mobile: "",
//         email: "",
//         password: "",
//         confirmpassword: ""
//     })

//     const [errors, setErrors] = useState({})

//     function handleChange(e) {
//         const {name, value} = e.target;
//         setFormData({...formdata, [name] : value})
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         const validationErrors = {}
//         if(!formdata.username.trim()) {
//             validationErrors.username = "username is required"
//         }

//         if(!formdata.fullname.trim()) {
//             validationErrors.fullname = "full name is required"
//         }

//         if(!formdata.mobile.trim()) {
//             validationErrors.mobile = "mobile is required"
//         }

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

//         if(formdata.password !== formdata.confirmpassword) {
//             validationErrors.confirmpassword = "passwords not matching"
//         }

//         if(!document.getElementById("terms-conditions").checked) {
//             validationErrors.terms = "You should agree the terms and conditions"
//         }

//         if(document.getElementById('captcha-text').value.length === 0) {
//             validationErrors.captcha = "Enter the captcha text"
//         } else if (validateCaptcha(document.getElementById('captcha-text').value)===false) {
//             validationErrors.captcha = "Invalid captcha!!!"
//         }

//         setErrors(validationErrors);

//         if(Object.keys(validationErrors).length === 0) {
//             const formData = new FormData();
//             formData.append('username', document.getElementById("username").value);
//             formData.append('fullname', document.getElementById("fullname").value);
//             formData.append('mobile', document.getElementById("mobile").value);
//             formData.append('email', document.getElementById("email").value);
//             formData.append('password', document.getElementById("password").value);
//             formData.append('confirmpassword', document.getElementById("confirmpassword").value);

//             try {
//                 const response = await axios.post('http://localhost:3000/api/users/register', formData, {
//                     headers: {
//                       'Content-Type': 'application/json', // or 'application/json' if needed
//                     },
//                 });
//                 console.log(response.data);
                
//                 navigate("/login");

//               } catch (error) {
//                 console.error('Error registering the user', error);
//               }
//         }

//     }

//     function validateCaptchaValue () {
//         let user_captcha_value = document.getElementById('captcha-text').value;
//         let captchaLabel = document.getElementById('captcha-status');

//         if (validateCaptcha(user_captcha_value, false)===true) {            
//             captchaLabel.innerText = ""
//             return true;
//         } else {
//             captchaLabel.innerText = "invalid captcha!!!"
//             return false;
//         }
//     }


//     return (
//         <>
//             <section className="signup-section">
//                 <div className="container h-100">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="card text-black" style={{ border: 0 }}>
//                                 <div className="main-div">
//                                     <div className="form-div">
//                                         <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{color: "rgb(37, 53, 76)"}}>
//                                             SIGN UP
//                                         </p>
//                                         <form id="signup-form" onSubmit={handleSubmit} noValidate>
//                                             <div className="inputs-div">
//                                                 <div className="icons-div">
//                                                     <FaUserAlt className="icons" />
//                                                     <div className="form-floating">
//                                                         <input
//                                                             onChange={handleChange}
//                                                             type="text"
//                                                             name="username"
//                                                             id="username"
//                                                             className="form-control"
//                                                             placeholder="User Name"                                                    
//                                                         />
//                                                         <label className="form-label">User Name</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.username && <span className="error-span">{errors.username}</span>}
//                                                 </div>
//                                             </div>
//                                             <div className="inputs-div">
//                                                 <div className="icons-div">
//                                                     <MdDriveFileRenameOutline className="icons" />
//                                                     <div className="form-floating">
//                                                         <input
//                                                             onChange={handleChange}
//                                                             type="text"
//                                                             name="fullname"
//                                                             id="fullname"
//                                                             className="form-control"
//                                                             placeholder="Full Name"                                                    
//                                                         />
//                                                         <label className="form-label">Full Name</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.username && <span className="error-span">{errors.fullname}</span>}
//                                                 </div>
//                                             </div>
//                                             <div className="inputs-div">
//                                                 <div className="icons-div">
//                                                     <AiFillMobile className="icons" />
//                                                     <div className="form-floating">
//                                                         <input
//                                                             onChange={handleChange}
//                                                             type="number"
//                                                             name="mobile"
//                                                             id="mobile"
//                                                             className="form-control"
//                                                             placeholder="Mobile"                                                    
//                                                         />
//                                                         <label className="form-label">Mobile</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.username && <span className="error-span">{errors.mobile}</span>}
//                                                 </div>
//                                             </div>
//                                             <div className="inputs-div">
//                                                 <div className="icons-div">
//                                                     <MdEmail className="icons" />
//                                                     <div className="form-floating">
//                                                     <input
//                                                         onChange={handleChange}
//                                                         type="email"
//                                                         name="email"
//                                                         id="email"
//                                                         className="form-control"
//                                                         placeholder="Email Id"
//                                                     />
//                                                     <label className="form-label">E-mail Id</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.email && <span className="error-span">{errors.email}</span>}
//                                                 </div>
//                                             </div>
//                                             <div className="inputs-div">
//                                                 <div className="icons-div">
//                                                     <FaLock className="icons" />
//                                                     <div className="form-floating">
//                                                     <input
//                                                         onChange={handleChange}
//                                                         type="password"
//                                                         name="password"
//                                                         id="password"
//                                                         className="form-control"
//                                                         placeholder="Password"
//                                                     />
//                                                     <label className="form-label">Password</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.password && <span className="error-span">{errors.password}</span>}
//                                                 </div>
//                                             </div>
//                                             <div className="inputs-div">
//                                                 <div className="icons-div">
//                                                     <FaKey className="icons" />
//                                                     <div className="form-floating">
//                                                     <input
//                                                         onChange={handleChange}
//                                                         type="password"
//                                                         name="confirmpassword"
//                                                         id="confirmpassword"
//                                                         className="form-control"
//                                                         placeholder="Repear Your Password"
//                                                     />
//                                                     <label className="form-label">Repeat Your Password</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.confirmpassword && <span className="error-span">{errors.confirmpassword}</span>}
//                                                 </div>
//                                             </div>
//                                             <div className="inputs-div">
//                                                 <div id="terms-checkbox">
//                                                     <input
//                                                         type="checkbox"
//                                                         defaultValue=""
//                                                         id="terms-conditions"
//                                                     />
//                                                     <label htmlFor="form2Example3">
//                                                     I agree all {" "}
//                                                     <a href="#!" id="terms-text">Terms of service</a>
//                                                     </label>
//                                                 </div>
//                                                 <div className="error-div">
//                                                     {errors.terms && <span className="error-span">{errors.terms}</span>}
//                                                 </div>
//                                             </div>
                                            
//                                             <div id="captcha-div">
//                                                 <a id="reload_href"><TbReload className="reload-icon"/><div></div></a>
//                                                 <LoadCanvasTemplateNoReload />
//                                                 <div id="captcha-input-div">
//                                                     <input type="text" id="captcha-text" onChange={validateCaptchaValue} className="form-control" placeholder="Type the code!" />
//                                                     <div className="input-status-div">
//                                                         <label id="captcha-status">{errors.captcha}</label>
//                                                         {/* {errors.captcha && <span className="error-span">{errors.captcha}</span>} */}
//                                                     </div>
//                                                 </div>
//                                             </div>
    
//                                             <div className="d-flex justify-content-center" id="register-div">
//                                                 <button type="submit" id="register-btn" className="btn btn-primary btn-lg">
//                                                 Register
//                                                 </button>
//                                             </div>

//                                             <div style={{display: "flex", justifyContent: "center"}}>
//                                                 <p className="small fw-bold mt-2 pt-1 mb-0">
//                                                     Already have an account?{" "}
//                                                     <a href="/login" className="link-success" style={{textDecoration: "none"}}>
//                                                         Login
//                                                     </a>
//                                                 </p>
//                                             </div>
//                                         </form>
//                                     </div>
//                                     <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
//                                         <img
//                                         src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
//                                         className="img-fluid"
//                                         alt="Sample image"
//                                         />
//                                     </div>
//                                 </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//         </>
//     );
// }