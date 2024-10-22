import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { formatCurrency } from "../utils/helpers";
import { createPaymentIntent } from "../services/api";


function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = () => {
        fetch('https://monkfish-app-v42dg.ondigitalocean.app/api/products')
        .then(response => {
            console.log('Fetching products response:', response);
            return response.json();
        })
        .then(data => {
            setProducts(data);
            console.log('Products fetched successfully:', data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handlePurchases = async (product: Product) => {
        try {
            console.log('Creating payment intent for product:', product);
            const paymentIntent = await createPaymentIntent(product.price);
            console.log("Payment intent:", paymentIntent);
        } catch (error) {
            console.error('Error handling purchase:', error);
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
                        <p>{product.description}</p>
                        <p>{formatCurrency(product.price)}</p>
                        <button onClick={() => handlePurchases(product)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductPage;