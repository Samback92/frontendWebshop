import './styling/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_public_key_here');

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
