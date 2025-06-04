import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productManager.getAllProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct); 
});


router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
    const deletedProductId = await productManager.deleteProduct(parseInt(req.params.pid));
    deletedProductId ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ error: 'Producto no encontrado' });
});

export default router;
