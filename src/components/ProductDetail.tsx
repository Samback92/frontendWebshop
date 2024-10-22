import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../interfaces/Product';


const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://monkfish-app-v42dg.ondigitalocean.app/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>{product.price} SEK</p>
        </div>
    );
};

export default ProductDetail;
