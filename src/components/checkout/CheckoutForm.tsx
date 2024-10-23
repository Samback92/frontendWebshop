import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from "../../contexts/CartContext";
import { createPaymentIntent } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';

const stripePromise = loadStripe('pk_test_51OqXrwITRkRLeIiFw7GXzcCkfnG3sjv6O8pX344pLBeWmp0evITiPKcymd7cd4VzD4t1gTDfNZo2VAw0616SKYlj00FiEa37vb');

const CheckoutForm: React.FC = () => {
    const { cart, totalPrice } = useCart();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentIntent = await createPaymentIntent(totalPrice);
            const { clientSecret } = paymentIntent;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                console.error(result.error.message);
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                alert('Betalningen lyckades!');
            }
        } catch (error) {
            console.error('Error handling payment:', error);
        }
    
    };        

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <p>Totalbelopp: {formatCurrency(totalPrice)} USD</p>
            <button type="submit" disabled={!stripe}>
                Betala
            </button>
        </form>
    );
};

const StripeCheckoutNow: React.FC = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripeCheckoutNow