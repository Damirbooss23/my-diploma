import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favrites.jsx"

import { Link } from 'react-router-dom'
import Products from './pages/Products.jsx'
import ShoppingCart from './pages/ShoppingCart.jsx'
import Blacklist from './pages/Blacklist.jsx'
import AddProduct from './pages/AddProduct.jsx'
import ProductPage from './pages/ProductPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <NavBar />

      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="blacklist" element={<Blacklist />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

