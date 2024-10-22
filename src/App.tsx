import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import StripeCheckoutNow from './components/checkout/CheckoutForm';
import './styling/App.css';

const App: React.FC = () => {
    return (
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
                                <Link to="/checkout">Checkout</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/products" element={<ProductPage />} />
                    {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/checkout" element={<StripeCheckoutNow />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;