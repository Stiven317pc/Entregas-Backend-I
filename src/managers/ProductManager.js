import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/products.json');

export default class ProductManager {
    constructor() {
        this.path = filePath;
    }

    async getAllProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getAllProducts();
        return products.find(product => product.id === id) || null;
    }

    async addProduct(product) {
        const products = await this.getAllProducts();
        const newProduct = { id: products.length + 1, ...product };
        products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getAllProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        }
        return null;
    }

    async deleteProduct(id) {
    const products = await this.getAllProducts();
    const filteredProducts = products.filter(product => product.id !== id);

    if (products.length === filteredProducts.length) {
        return null;
    }

    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
    return id;  
}

}
