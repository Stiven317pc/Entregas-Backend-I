import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const pm = new ProductManager('./data/productos.json');

router.get('/', async (req, res) => {
  const products = await pm.getAllProducts();
  res.render('home', { title: 'Home', products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await pm.getAllProducts();
  res.render('realTimeProducts', { title: 'Live Products', productos: products });
});

export default router;
