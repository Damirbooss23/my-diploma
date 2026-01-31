import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({src,title,category,definition,price,value,type,color,size,onAdd,gender,others,onAddFav,onAddCart,onAddBlacklist, onDelete}) => {
    const colors = [
        { name: "Red", code: "#FF0000" },
        { name: "Blue", code: "#0000FF" },
        { name: "Green", code: "#00FF00" },
        { name: "Black", code: "#000000" },
        { name: "White", code: "#FFFFFF" }
    ]
    return(
        <>
            <div className="product-item">
                <img src={src} className="product-image"/>
                <Link  to={"/prodduct/"+ id}> <h1 className="product-title">{title}</h1></Link>
                <p className="product-category">{category} {type}</p>
                <p className="product-definition">{definition}</p>
                <span className="product-definition">
                     <span className="product-color" style={{backgroundColor: colors.find(c => c.name === color)?.code || '#FFFFFF'}}></span>
                      / {size} / {gender} / {others} </span>
                <div className="product-footer">
                    <span className="product-price">{price}</span>
                    <button onClick ={onAddFav}>add-to-favorite</button>
                    <button onClick = {onAddCart} className="add-to-card-button">{value}</button>
                    <button onClick={onAddBlacklist} style={{ backgroundColor: "black", color: "white", marginLeft: "10px" }}>Add to Blacklist</button>
                </div>
                <button className="delete-product" onClick={onDelete}>Удалить</button>
            </div>
        </>
    );
}
export default ProductCard;
