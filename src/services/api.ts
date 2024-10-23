// const API_URL = "https://monkfish-app-v42dg.ondigitalocean.app/api";

export const createPaymentIntent = async (amount: number) => {
    try {
        const response = await fetch(`https://monkfish-app-v42dg.ondigitalocean.app/api/stripe/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
            credentials: "include", // Include credentials for authenticated requests
        });
        if (!response.ok) {
            throw new Error("Failed to create payment intent");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating payment intent", error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await fetch(`https://monkfish-app-v42dg.ondigitalocean.app/api/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products", error);
        throw error;
    }
};
