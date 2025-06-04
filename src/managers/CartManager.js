import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/carts.json');

export default class CartManager {
    constructor() {
        this.path = filePath;
    }

    async getAllCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async createCart() {
        const carts = await this.getAllCarts();
        const newCart = { id: Date.now(), products: [] };
        carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getAllCarts();
        return carts.find(cart => cart.id === id) || null;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getAllCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);

        if (cartIndex !== -1) {
            const existingProduct = carts[cartIndex].products.find(p => p.product === productId);
            if (existingProduct) {
                existingProduct.quantity += 1; 
            } else {
                carts[cartIndex].products.push({ product: productId, quantity: 1 });
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return carts[cartIndex];
        }

        return null;
    }
}
