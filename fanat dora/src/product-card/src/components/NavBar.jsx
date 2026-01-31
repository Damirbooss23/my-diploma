import { Search, ShoppingCart, Heart,MousePointer2Off } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" className="brand-text">Eshop</Link>
            </div>

            <div className="nav-links">
                <Link className="nav-link" to="/new">New</Link>
                <Link className="nav-link" to="/popular">Popular</Link>
                <Link className="nav-link" to="/sale">Sale</Link>
                <Link className="nav-link" to="/sport">Sport</Link>
                <Link className="nav-link" to="/products">Products</Link>
                <Link className="nav-link" to="/add-product">Add Product</Link>
                
            </div>

            <div className="nav-buttons">
                <Link to="/cart"><ShoppingCart className="nav-icon" /></Link>
                <Heart className="nav-icon" />
                <Link to= "/favorites"> <Heart className="nav-icon"/></Link>
                <MousePointer2Off className="nav-icon"/>
                <Link to= "/blacklist"> <MousePointer2Off className="nav-icon"/></Link>
                <Search className="nav-icon" />
                <button className="login-button">Login</button>
            </div>
        </nav>
    );
}

export default NavBar;
