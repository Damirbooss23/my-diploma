import React, {useState, useEffect} from 'react';
import ShoppingCartItem from '../components/ShoppingCartItem';
import {getCart, updateToCart, removeFromCart} from "../services/cartService";


const ShoppingCart = () => {

    const products = [
    {
      src: "https://www.jdsports.com.sg/cdn/shop/files/511342132_18067664321023187_2954913870394091478_n.jpg?v=1762486470&width=1080",
      title: "Nike Air Red Running",
      category: "Shoes",
      definition: "Lightweight, stylish, cushioned sneakers.",
      price: 299,
      value: "Add to cart",
      type: "Running",
      color: "Red",
      size: "36",
      gender: "Men",
      others: "New Arrivals",
      quantity: 1
    },
    {
      src: "https://www.jdsports.com.sg/cdn/shop/files/511342132_18067664321023187_2954913870394091478_n.jpg?v=1762486470&width=1080",
      title: "Nike Air Blue Casual",
      category: "Shoes",
      definition: "Everyday casual sneakers.",
      price: 259,
      value: "Add to cart",
      type: "Casual",
      color: "Blue",
      size: "37",
      gender: "Kids",
      others: "Best Sellers",
      quantity: 2
    }];

    const [cartItems, setCartItems] = useState([]);

    async function fetchCart() {
        const response = await getCart();
        setCartItems(response.data)
    }

    useEffect(() => {
      fetchCart();
    }, [])

    async function removeItem(index) {
        const newCartItems = cartItems.find((item, i) => i === index);
        
        await removeFromCart(newCartItems.id);
        const response = await getCart();
        setCartItems(response.data)
    }

    async function changeQuantity(index, newQuantity) {

        const item = cartItems[index];    

        setCartItems(cartItems.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));

       await updateToCart(item.id, newQuantity);
    }

    return (
        <div className="shopping-cart-page">
            <h1 className="shopping-cart-title">Shopping cart</h1>
             <button onClick={notify}>Notify!</button>
            {cartItems.map((item, index) => (
                <ShoppingCartItem
                    src={item.src}
                    title={item.name}
                    price={item.price}
                    quantity={item.cart_quantity}
                    key={index}
                    onRemove={() => removeItem(index)}
                    onChangeQuantity={(newQuantity) => (
                        changeQuantity(index, newQuantity)
                    )}
                />
            ))}
        </div>
    )
}

export default ShoppingCart;

