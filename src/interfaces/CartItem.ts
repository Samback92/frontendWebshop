import { Product } from "../interfaces/Product";

export interface CartItem extends Product {
    quantity: number;
}
