import React from "react";

const FavoriteItem = ({
    src,
    title,
    category,
    price,
    color,
    size,
    gender,
    onAddToCart,
    onRemove
}) => {
    return (
        <div className="favorite-card">
            <img src={src} className="favorite-image" />
            <div className="favorite-info">
                <h2>{title}</h2>
                <p>{category}</p>
                <p>Color: {color}</p>
                <p>Size: {size}</p>
                <p>Gender: {gender}</p>
                <p>Price: {price} $</p>
                <div className="favorite-buttons">
                    <button onClick={onAddToCart}>Add to cart</button>
                    <button className="remove-btn" onClick={onRemove}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default FavoriteItem;
