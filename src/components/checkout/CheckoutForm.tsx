import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from "../../contexts/CartContext";
import { createPaymentIntent } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51OqXrwITRkRLeIiFw7GXzcCkfnG3sjv6O8pX344pLBeWmp0evITiPKcymd7cd4VzD4t1gTDfNZo2VAw0616SKYlj00FiEa37vb');

type StripeError = {
    message: string;
};


const CheckoutForm: React.FC = () => {
    const { totalPrice, clearCart } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        try {
            const paymentIntent = await createPaymentIntent(totalPrice);
            const { clientSecret } = paymentIntent;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });
            if (result.error) {
                setError(result.error.message || 'Payment failed');
                setProcessing(false);
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                setProcessing(false);
                clearCart(); // Clear the cart after successful payment
            }
        } catch (error) {
            const stripeError = error as StripeError;
            setError(stripeError.message || 'An unexpected error occurred');
            setProcessing(false);
        }
    };

    useEffect(() => {
        if (succeeded) {
            setTimeout(() => {
                navigate('/');
            }, 5000); // Redirect after 5 seconds
        }
    }, [succeeded, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <p>Totalbelopp: {formatCurrency(totalPrice)} USD</p>
            <button type="submit" disabled={!stripe || processing}>
                {processing ? "Processing..." : "Betala"}
            </button>
            {error && <div>{error}</div>}
            {succeeded && <div>Betalningen lyckades! Omdirigerar till startsidan...</div>}
        </form>
    );
};

const StripeCheckoutNow: React.FC = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripeCheckoutNow;
