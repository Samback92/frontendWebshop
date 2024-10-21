import React, { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { formatCurrency } from "../utils/helpers";
import { createPaymentIntent } from "../services/api";


const ProductPage: React.FC = () => {
        const [products, setProducts] = useState<Product[]>([]);

        useEffect(() => {
            fetch('https://monkfish-app-v42dg.ondigitalocean.app/api/products')
                .then(response => {
                    if (!response.ok) {
                        throw new Error ('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products: ', error));
        }, []);

        const handlePurchases = async (product: Product) => {
            try {
                const paymentIntent = await createPaymentIntent(product.price);
                console.log("Payment intent:", paymentIntent);
            } catch (error) {
                console.error('Error handling purchase: ', error);
            }
        };

        return (
            <div>
                <h1>Produkter</h1>
                <ul>
                   {products.map(product => ( 
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                        {product.description}
                        {formatCurrency(product.price)}
                        <button onClick={() => handlePurchases(product)}>Buy</button>
                    </li>
                    ))} 
                </ul>
            </div>
        );
};

export default ProductPage;