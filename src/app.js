import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';

import productsRouter from './routes/products-router.js';
import cartsRouter from './routes/carts-router.js';
import viewsRouter from './routes/views-router.js'; 

import ProductManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);

const productManager = new ProductManager('./src/data/productos.json');

io.on('connection', async socket => {
  console.log('🟢 Cliente conectado');

  const productos = await productManager.getAllProducts(); 
  socket.emit('product-list', productos);

  socket.on('new-product', async data => {
    await productManager.addProduct(data);
    const productosActualizados = await productManager.getAllProducts();
    io.emit('product-list', productosActualizados);
  });

  socket.on('eliminarProducto', async id => {
    const idNum = parseInt(id); 
    await productManager.deleteProduct(idNum);
    const productosActualizados = await productManager.getAllProducts();
    io.emit('product-list', productosActualizados);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor con WebSocket activo en http://localhost:${PORT}`);
});
