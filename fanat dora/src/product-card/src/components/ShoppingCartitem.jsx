import React from "react";

const ShoppingCartItem = ({ src, title, price, quantity, onRemove }) => {
    return (
        <div className="cart-item">

          
            <img src={src} alt={title} className="cart-item-image" />

            
            <div className="cart-item-info">
                <h3 className="cart-item-title">{title}</h3>
                <p className="cart-item-price">Price: {price} $</p>
                <p className="cart-item-quantity">Quantity: {quantity}</p>
            </div>

        
            <button className="cart-item-remove" onClick={onRemove}>
                Remove
            </button>
        </div>
    );
};

export default ShoppingCartItem;


