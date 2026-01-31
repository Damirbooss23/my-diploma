import React, { useState, useEffect } from "react";
import FavoriteItem from "../components/FavoriteItem.jsx";

const Favorites = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favProducts")) || [];
        setFavoriteItems(savedFavorites);
    }, []);

    const removeFavorite = (index) => {
        const updated = favoriteItems.filter((_, i) => i !== index);
        setFavoriteItems(updated);
        localStorage.setItem("favProducts", JSON.stringify(updated));
    };

    const addToCart = (product) => {
        const savedCart = JSON.parse(localStorage.getItem("cart-items")) || [];
        const updatedCart = [...savedCart, product];

        localStorage.setItem("cart-items", JSON.stringify(updatedCart));
    };

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">Favorite Products</h1>

            {favoriteItems.length === 0 ? (
                <p>No favorite items yet.</p>
            ) : (
                favoriteItems.map((product, index) => (
                    <FavoriteItem
                        key={index}
                        src={product.src}
                        title={product.title}
                        category={product.category}
                        price={product.price}
                        color={product.color}
                        size={product.size}
                        gender={product.gender}
                        onAddToCart={() => addToCart(product)}
                        onRemove={() => removeFavorite(index)}
                    />
                ))
            )}
        </div>
    );
};

export default Favorites;
