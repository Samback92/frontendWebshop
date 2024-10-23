import './styling/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OqXrwITRkRLeIiFw7GXzcCkfnG3sjv6O8pX344pLBeWmp0evITiPKcymd7cd4VzD4t1gTDfNZo2VAw0616SKYlj00FiEa37vb');


const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Elements stripe={stripePromise}>
                    <App />
            </Elements>
        </React.StrictMode>
    );
}
