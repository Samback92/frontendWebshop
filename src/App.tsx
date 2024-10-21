import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import StripeCheckout from './components/checkout/CheckoutForm';
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
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/products">Products</a>
                            </li>
                            <li>
                                <a href="/checkout">Checkout</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/products" element={<ProductPage />} />
                    {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
                    {/* <Route path="/" element={<HomePage />} /> */}
                    <Route path="/checkout" element={<StripeCheckout />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;