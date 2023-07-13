import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsData from './productlist.json';



function Product() {
    useEffect(() => {
        document.getElementById("header").classList.remove("login-nav");
        document.getElementById("footer").classList.remove("login-footer");
    }
    );

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsData);
    }, []);



    return (
        <>
            <div className="product">
                <h1>Products</h1>
            </div>

            <div className="container-fluid filter2">
                <div className="row">
                    <div className="col-12 products">
                        <div>
                            <div className="row">
                                {products.map(product => (
                                    <div className="slide col-lg-4 col-12" key={product.id}>
                                        <Link to={`/productdetail/${product.id}`}>
                                            <div className="slide-img">
                                                <img src={product.image}></img>
                                            </div>
                                            <h5>{product.shortname}</h5></Link>
                                        <div className="d-flex align-items-center justify-content-center gap-5 my-2">
                                            <h6>INR {product.discountedprice}</h6>
                                            <p>INR {product.price}</p>
                                        </div>
                                        <h4>{product.stock}</h4>
                                        {/* <button className="btn2">Add to cart</button> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Product