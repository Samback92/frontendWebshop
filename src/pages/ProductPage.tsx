import React, { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { fetchProducts } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/helpers";

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, []);

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
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;
