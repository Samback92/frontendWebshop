export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('sv-SE', { 
        style: 'currency', 
        currency: 'SEK', 
    }).format(amount);
}