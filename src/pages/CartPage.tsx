import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Kontrollera att CartContext är korrekt importerat
import { formatCurrency } from '../utils/helpers';

const CartPage: React.FC = () => {
    const { cart, removeFromCart, clearCart, totalAmount, totalPrice } = useCart();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Varukorg</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.name} width={50} height={50} />
                        <p>{item.name}</p>
                        <p>Antal: {item.quantity}</p>
                        <p>Pris: {formatCurrency(item.price)} USD</p>
                        <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
                        <p>Totalantal: {totalAmount}</p>
                    </li>
                ))}
            </ul>
            <p>Totalbelopp: {formatCurrency(totalPrice)} USD</p>
            <button onClick={clearCart}>Töm varukorgen</button>
            <button onClick={() => navigate('/checkout')}>Gå till kassan</button>
        </div>
    );
};

export default CartPage;
