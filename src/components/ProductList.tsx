import React, { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product';


const ProductList: React.FC = () => {
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

    return (
        <div>
            <h1>Produkter</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>{product.price} USD</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;