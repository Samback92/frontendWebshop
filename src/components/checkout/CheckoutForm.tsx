import React, { useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51OqXrwITRkRLeIiFw7GXzcCkfnG3sjv6O8pX344pLBeWmp0evITiPKcymd7cd4VzD4t1gTDfNZo2VAw0616SKYlj00FiEa37vb');

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }


        const cardElement = elements.getElement(CardElement);

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stripe/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 2000 }) // Amount in cents
        });

        const { clientSecret } = await response.json();

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement!,
                billing_details: { name: 'Test User' }
            }
        });

        if (paymentResult.error) {
            setErrorMessage(paymentResult.error.message!);
        } else {
            if (paymentResult.paymentIntent?.status === 'succeeded') {
                alert('Payment successful!');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

const StripeCheckout: React.FC = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
 );

export default StripeCheckout