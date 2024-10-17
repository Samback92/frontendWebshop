import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../interfaces/Product';


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Produkter</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price} SEK</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;