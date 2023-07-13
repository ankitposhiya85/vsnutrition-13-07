import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartState } from "../contex/contex";
import productsData from './productlist.json';
// import axios from "axios";


function Cart() {
    useEffect(() => {
        document.getElementById("header").classList.remove("login-nav");
        document.getElementById("footer").classList.remove("login-footer");
    });

    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [total, setTotal] = useState();
    

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.discountedprice) * curr.qty, 0)
        );
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cart));
    }, [cart]);


    // useEffect(() => {
    //     dispatch({ type: "CART_TOTAL" });
    //     localStorage.setItem("cartData", JSON.stringify(cart))
    // }, [cart]);



    const token = localStorage.getItem("TOKEN");


    // useEffect(() => {
    //     // set configurations for the API call here
    //     const configuration = {
    //         method: "get",
    //         url: "http://localhost:4000/auth-endpoint",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };

    //     // make the API call
    //     axios(configuration)
    //         .then(() => {

    //         })
    //         .catch((error) => {
    //             error = new Error();
    //             window.location.pathname = "/login"
    //         });
    // }, []);

    const [product, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsData);
    }, []);



    function checkout() {
        if (token === null) {
            alert("Thanks for shopping");
            window.location.pathname = "/login";
        } else {
            alert("Thanks for shopping");
            window.location.pathname = "/";
        }

    }

    return (
        <>
            <div className="cart">
                <div className="cart-product">
                    <h1>My Cart</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-12">
                            <div className="row products-row">
                                <div className="row">
                                    {cart.map(product => (
                                        <div className="products-row1 row">
                                            <div className="col-lg-4 col-12 products-row2">
                                                <Link to={`/productdetail/${product.id}`}><img src={product.image} key={product} className="cart-p-img"></img></Link>
                                            </div>
                                            <div className="col-lg-7 col-12 products-row2">
                                                <div>
                                                    <Link to={`/productdetail/${product.id}`}><h5>{product.shortname}</h5></Link>
                                                    <div className="cart-p-detail">
                                                        <div className="d-flex gap-3 align-items-center">
                                                            <h6>Qty.</h6>
                                                            {/* <select
                                                                onChange={(e) =>
                                                                    dispatch({
                                                                        type: "CHANGE_CART_QTY",
                                                                        payload: {
                                                                            id: product.id,
                                                                            qty: e.target.value,
                                                                        },
                                                                    })
                                                                } >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                            </select>  */}


                                                            <div className="quntity">
                                                                <img src="/Img/minus.png" onClick={() => {
                                                                    let id = product.id
                                                                    dispatch({
                                                                        type: "SET_DECREMENT",
                                                                        payload: id
                                                                    })
                                                                }}></img>

                                                                <div>{product.qty}</div>
                                                                <img src="/Img/plus.png" onClick={() => {
                                                                    let id = product.id
                                                                    dispatch({
                                                                        type: "SET_INCREMENT",
                                                                        payload: id
                                                                    })
                                                                }}></img>
                                                            </div>
                                                            {/* <CartAmountToggle
                                                                qty={qty}
                                                                setincrese={() => setDecrease(id)}
                                                                setdecrese={() => setIncrement(id)}
                                                            /> */}
                                                            <h5>INR {product.discountedprice}</h5>
                                                            <img src="Img/delete.png" className="delete-img" id="remove" alt="delete img" onClick={() =>
                                                                dispatch({
                                                                    type: "REMOVE_FROM_CART",
                                                                    payload: product,
                                                                })
                                                            }></img>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="total">
                                <div className="total-txt">
                                    <div className="total1">
                                        <p>Subtotal:</p>
                                        <p>{total}</p>
                                    </div>
                                    {/* <div className="total1">
                                        <p>Delivery:</p>
                                        <p>50</p>
                                    </div>
                                    <hr></hr>
                                    <div className="total1">
                                        <h5>Total</h5>
                                        <h5>{total + 50}</h5>
                                    </div> */}
                                    <div className="d-flex justify-content-between gap-3">
                                        <button className="btn5" onClick={checkout}>Checkout</button>
                                        <button className="btn5" onClick={() =>
                                            dispatch({
                                                type: "CLEAR_CART",
                                                payload: product,
                                            })
                                        }>Clear Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Cart