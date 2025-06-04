import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
import productsRouter from './routes/products-router.js';
import cartsRouter from './routes/carts-router.js';

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
