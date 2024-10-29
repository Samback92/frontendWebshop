import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import StripeCheckoutNow from './components/checkout/CheckoutForm';
import { CartProvider } from './contexts/CartContext';
import './styling/App.css';


const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <header>
                        <h1>Webshop</h1>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/products">Products</Link>
                                </li>
                                <li>
                                    <Link to="/cart">Cart</Link>
                                </li>
                                <li>
                                    <Link to="/checkout">Checkout</Link>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <Routes>
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/checkout" element={<StripeCheckoutNow />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;