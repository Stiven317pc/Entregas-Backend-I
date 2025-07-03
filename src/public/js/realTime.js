const socket = io();

const formAgregar = document.getElementById('form-agregar');
const formEliminar = document.getElementById('form-eliminar');
const lista = document.getElementById('product-list');

formAgregar.addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.title.value;
  const price = parseFloat(e.target.price.value);
  socket.emit('new-product', { title, price });
  e.target.reset();
});

formEliminar.addEventListener('submit', e => {
  e.preventDefault();
  const id = e.target.id.value;
  socket.emit('eliminarProducto', id);
  e.target.reset();
});

socket.on('product-list', productos => {
    const lista = document.getElementById('product-list');
    lista.innerHTML = '';
    productos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.title} - $${p.price}`;
    lista.appendChild(li);
  });
});
