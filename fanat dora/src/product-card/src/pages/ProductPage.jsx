
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const loadProduct = async () => {
        try {
            const response = await getProduct(id);
            setProduct(response.data);
        } catch (e) {
            console.log("Eror fetching", e);
        }
    }
    useEffect(() => {
        loadProduct();
    }, [])
    return (
        <div className="product-page page">
            <div className="container">
                <div className="product-page-image">
                    <img src={product.src} />
                </div>
                <div className="product-page-content">
                    <h1>{product.title}</h1>
                    <span className="product-page-price">{product.price} $</span>
                    <p className="product-page-category">{product.category}</p>
                    <p className="product-page-definition">{product.definition}</p>
                    <div>
                        <h3>Color: </h3>
                        <span className="product-page-color" style={{backgroundColor: product.color}}></span>
                    </div>
                     <div>
                        <h3>Size: </h3>
                        <span className="product-page-size">{product.size}</span>
                    </div>
                    <div className="product-page-footer">
                        <button className="add-to-card-button product-page-button">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductPage;