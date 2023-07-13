import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartState } from "../contex/contex";
function Navbar() {

    const {
        state: { cart },
    } = CartState();

    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const token = localStorage.getItem("TOKEN");
    const name = localStorage.getItem("userName");
    const mobile = localStorage.getItem("userMobile");
    const address = localStorage.getItem("userAddress");
    const email = localStorage.getItem("userEmail");

    // if (token.trim().length !== 0) {
    //     loginBtn.innerText = 'Log out';
    // }

    const logout = () => {
        // destroy the cookie
        localStorage.removeItem("TOKEN", token);
        localStorage.removeItem("userEmail", email);
        localStorage.removeItem("userMobile", mobile);
        localStorage.removeItem("userAddress", address);
        localStorage.removeItem("userName", name);
        // redirect user to the landing page
        window.location.href = "/";
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" id="header" >
                <div className="container">
                    <Link to="/"><img src='/Img/logo.png'></img></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><img src='/Img/Menu.png'></img> </span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/">Home</Link>
                            <Link to="/product">Products</Link>
                            <Link to="/photos">Gallery</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/cart"><img src="/Img/shopping-cart.png" className="cart-img"></img><span className="badge">{cart.length}</span></Link>
                            <Link to="/personal"><img src="/Img/user.png" className="cart-img" id="user-img"></img></Link>
                            <Link to="/login"><button className="btn4" id="login-btn">Log In</button></Link>
                            <Link to="/login"><button className="btn4" id="logout-btn" onClick={logout}>Log Out</button></Link>
                            <p>{name}</p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar