import React from "react";

function CartAmountToggle({ qty, setdecrese, setincrese }) {
    return (
        <>
            <div className="quntity">
                <img src="/Img/minus.png" onClick={() => setdecrese()}></img>
                <div>{qty}</div>
                <img src="/Img/plus.png" onClick={() => setincrese()}></img>
            </div>
        </>
    )
}

export default CartAmountToggle