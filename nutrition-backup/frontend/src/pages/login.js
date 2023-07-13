import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

function Login() {

    useEffect(() => {
        document.getElementById("header").classList.add("login-nav");
        document.getElementById("footer").classList.add("login-footer");
    }, []);

    const worngpassword = document.getElementById("wrong-Password");

    const handleKey = event => {
        if (event.key === 'Enter') {
            const configuration = {
                method: "post",
                url: "http://localhost:4000/login",
                data: {
                    email,
                    password,
                },
            };

            // make the API call
            axios(configuration)
                .then((result) => {
                    // set the cookie
                    localStorage.setItem("TOKEN", result.data.token);
                    localStorage.setItem("userName", result.data.name);
                    localStorage.setItem("userEmail", result.data.email);
                    localStorage.setItem("userMobile", result.data.mobile);
                    localStorage.setItem("userAddress", result.data.address);
                    
                    // redirect user to the home page
                    window.location.pathname = "/";
                    setLogin(true);
                })
                .catch((error) => {
                    error = new Error();
                    worngpassword.innerText = "Email or Password is wrong";
                });
        }
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:4000/login",
            data: {
                email,
                password,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                // set the cookie
                localStorage.setItem("TOKEN", result.data.token, {
                });
                // redirect user to the home page
                window.location.pathname = "/";
                setLogin(true);
            })
            .catch((error) => {
                error = new Error();
                worngpassword.innerText = "Email or Password is wrong";
            });

    };


    return (
        <>
            <div className="login container">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <h1>User Log In</h1>
                        <div className="login1">
                            <span id="wrong-Password"></span>
                            <h4>Email</h4>
                            <input placeholder="Enter your mail address" name="Email" type="text" onKeyDown={handleKey} onChange={(e) => setEmail(e.target.value)} required></input>
                            <h4>Password</h4>
                            <input placeholder="Enter password" type="password" name="password" onKeyDown={handleKey} onChange={(e) => setPassword(e.target.value)} required></input>
                            <Link to="/"><button className="btn1" onClick={(e) => handleSubmit(e)} >Log In</button></Link>
                            {login ? (
                                <p className="text-success">You Are Logged in Successfully</p>
                            ) : (
                                <p className="text-danger">You Are Not Logged in</p>
                            )}
                            <div className="login1-txt">
                                <p>Don't have an account?</p>
                                <Link to="/register"><h6>Register here</h6></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 login-img">
                        <img src="Img/login.png"></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login