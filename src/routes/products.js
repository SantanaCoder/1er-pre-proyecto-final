const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const productosData = fs.readFileSync('src/database/productos.json', 'utf8');
const productos = JSON.parse(productosData);



router.use(bodyParser.json());



router.get('/api/products', (req, res) => {
  res.json({ products: productos })
});

router.get('/api/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const producto = productos.find(p => p.id === pid);
  res.json(producto);
});

router.post('/api/products', (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }

  const nuevoID = generarNuevoID();

  const nuevoProducto = {
    id: nuevoID,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  productos.push(nuevoProducto);

  fs.writeFileSync('src/database/productos.json', JSON.stringify(productos, null, 2));

  res.status(201).json(nuevoProducto);
});

function generarNuevoID() {
  return productos.reduce((maxID, producto) => {
    return producto.id > maxID ? producto.id : maxID;
  }, 0) + 1;
}

router.put('/api/products/:pid', (req, res) => {
  const pid = req.params.pid;
  const nuevosDatos = req.body;
 
  productos = productos.map(p => (p.id === pid ? { ...p, ...nuevosDatos } : p));
  fs.writeFileSync('src/database/productos.json', JSON.stringify(productos, null, 2));
  res.json(productos.find(p => p.id === pid));
});

router.delete('/api/products/:pid', (req, res) => {
  const pid = req.params.pid;
  let productos = JSON.parse(fs.readFileSync('src/database/productos.json', 'utf8'));
  productos = productos.filter(p => p.id !== pid);
  fs.writeFileSync('src/database/productos.json', JSON.stringify(productos, null, 2));
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

module.exports = router;
