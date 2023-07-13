import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function Personal() {
    useEffect(() => {
        document.getElementById("header").classList.remove("login-nav");
        document.getElementById("footer").classList.remove("login-footer");
    }, []);


    // get token generated on login
    const token = localStorage.getItem("TOKEN");
    // const [data, setdata] = useState([]);
    const name = localStorage.getItem("userName");
    const mobile = localStorage.getItem("userMobile");
    const address = localStorage.getItem("userAddress");
    const email = localStorage.getItem("userEmail");
    // useEffect automatically executes once the page is fully loaded
    useEffect(() => {
        // set configurations for the API call here
        const configuration = {
            method: "get",
            url: "http://localhost:4000/auth-endpoint",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // make the API call
        axios(configuration)
            .then(() => {

            })
            .catch((error) => {
                error = new Error();
                window.location.pathname = "/login";
            });
    }, []);


    // useEffect(() => {
    //     // set configurations for the API call here
    //     fetch("http://localhost:4000/getUserData", {
    //         method: "GET",
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
                
    //             setdata(data.data)
    //         });
    // }, [])

    // logout
    const logout = () => {
        // destroy the cookie
        localStorage.removeItem("TOKEN", token);
        localStorage.removeItem("userEmail", email);
        localStorage.removeItem("userMobile", mobile);
        localStorage.removeItem("useraddress", address);
        localStorage.removeItem("userName", name);
        // redirect user to the landing page
        window.location.href = "/";
    }

    return (
        <>
            <div className="cart-product">
                <h1>My Account</h1>
            </div>
            <div className="details1">
                <div className="container-fluid">
                    <div className="row g-5">
                        <div className="col-lg-3 col-12">
                            <div className="user-menu">
                                <div className="user-menu-txt">
                                    <h3>Welcome</h3>
                                    <hr></hr>
                                    <Link to="/personal"><div className="menu1">
                                        <div className="d-flex gap-3">
                                            <img src="Img/user 1.png" className="menu-img"></img>
                                            <p>Personal data</p>
                                        </div>
                                        <img src="Img/arrow.png" className="arrow"></img>
                                    </div></Link>
                                    <hr></hr>
                                    <Link to="/orders"><div className="menu1">
                                        <div className="d-flex gap-3">
                                            <img src="Img/order.png" className="menu-img"></img>
                                            <p>Orders</p>
                                        </div>
                                        <img src="Img/arrow.png" className="arrow"></img>
                                    </div></Link>
                                    <hr></hr>
                                    <Link to="/changepassword"><div className="menu1">
                                        <div className="d-flex gap-3">
                                            <img src="Img/lock.png" className="menu-img"></img>
                                            <p>Change password</p>
                                        </div>
                                        <img src="Img/arrow.png" className="arrow"></img>
                                    </div></Link>
                                    <hr></hr>
                                    <Link to="/address"><div className="menu1">
                                        <div className="d-flex gap-3">
                                            <img src="Img/home.png" className="menu-img"></img>
                                            <p>Address</p>
                                        </div>
                                        <img src="Img/arrow.png" className="arrow"></img>
                                    </div></Link>
                                    <hr></hr>
                                    <Link to="/" onClick={logout}><div className="menu1">
                                        <div className="d-flex gap-3">
                                            <img src="Img/sign-out.png" className="menu-img"></img>
                                            <p>Sign Out</p>
                                        </div>
                                        <img src="Img/arrow.png" className="arrow"></img>
                                    </div></Link>
                                    <hr></hr>
                                    <Link to="/admin"><div className="menu1">
                                        <div className="d-flex gap-3">
                                            <img src="Img/admin.png" className="menu-img"></img>
                                            <p>Admin</p>
                                        </div>
                                        <img src="Img/arrow.png" className="arrow"></img>
                                    </div></Link>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-12 personal">
                            <div>
                                <h1>My Details</h1>
                                    <>
                                        <div className="personal1">
                                            <h3>Name</h3>
                                            <p>{name}</p>
                                        </div>
                                        <div className="personal1">
                                            <h3>Email</h3>
                                            <p>{email}</p>
                                        </div>
                                        <div className="personal1">
                                            <h3>Mobile</h3>
                                            <p>{mobile}</p>
                                        </div>
                                        <div className="personal1">
                                            <h3>Address</h3>
                                            <p>{address}</p>
                                        </div>
                                    </>
                                

                                <Link to="/personal1"><button className="btn1">Change</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Personal