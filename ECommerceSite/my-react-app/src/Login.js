import { events } from '@react-three/fiber';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import validate from './ValidateLogIn'
import axios from 'axios'
import './Login.css';

export default function Login() {
    const [infos, setInfos] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState("");
    const [errors, setErrors] = useState({})
    const handleSubmit = (e) => {   
        e.preventDefault();
        const userData = {
            name: infos.name,
            email: infos.email,
            password: infos.password
        }
        const err = validate(infos);
        setErrors(err);
        if(err.email === "" && err.password == "") {
            axios.post('http://localhost:8080/login', userData).then(res => {
                if(res.data === "Success") {
                    sessionStorage.setItem("CurrentUser", userData.email);
                    navigate('/');
                } else {
                    setLoginState("Incorrect email/password");
                }
            }).catch(err => console.log(err));
        }
    }
    const handleInput = (e) => {
        setInfos(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    return (
        /* Joshua Header Start */
        <div className="jLogInBody">
            <div className="jLogInHeader">
                <div className="jLogInLogo">
                    <Link to="/"><h1>3Diverse</h1></Link>
                </div>
            </div>
            {/* Joshua Header End */}

            <div id="login-body">
                <div id="login-page">
                    <h2>Log In</h2>
                    <form className="form" id="login-form" action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Email</label> <br/>
                            <input type="text" name="email" placeholder='Enter your email...' onChange={handleInput} />  <br />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label> <br/>
                            <input type="password" name="password" placeholder='Enter your password...' onChange={handleInput} />  <br />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>
                        <button id="login-btn" role=""type="submit">Log In</button>
                    </form>
                    {loginState && <span>{loginState}</span>}
                    <br />
                    <Link to="/Signup" id="link">Create an Account</Link>
                </div>
            </div>
        
            {/* Joshua Footer End */}
            <div className="footer">
                <div className="logo">
                    <Link to="/"><h1>3Diverse</h1></Link>
                </div>
                <p>Contact us at: <a href="#" target="_blank">support@3Diverse.com</a></p>
                <p><a href="#" target="_blank">Subscribe to our newsletter</a></p>
                <p className="copyright">© 2023 3Diverse </p>
            </div>
        </div>
        /* Joshua Footer Start */
    );
}