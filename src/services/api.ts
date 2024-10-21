const API_URL = "http://localhost:8080/api";

export const createPaymentIntent = async (amount: number) => {
    try {
        const response = await fetch(`${API_URL}/stripe/create-payment-intent`, {
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
