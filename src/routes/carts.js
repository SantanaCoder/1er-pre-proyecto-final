const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', (req, res) => {
  const carritos = JSON.parse(fs.readFileSync('carritos.json', 'utf8'));
  res.json(carritos);
});


router.post('/', (req, res) => {
  const nuevoCarrito = {
    id: generarNuevoID(carritos),
    products: []
  };
  let carritos = JSON.parse(fs.readFileSync('carritos.json', 'utf8'));
  carritos.push(nuevoCarrito);
  fs.writeFileSync('carritos.json', JSON.stringify(carritos, null, 2));
  res.json(nuevoCarrito);
});


router.get('/:cid', (req, res) => {
  const cid = req.params.cid;
  let carritos = JSON.parse(fs.readFileSync('carritos.json', 'utf8'));
  const carrito = carritos.find(c => c.id === cid);
  if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
  res.json(carrito.products);
});


router.post('/:cid/product/:pid', (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  
  let carritos = JSON.parse(fs.readFileSync('carritos.json', 'utf8'));
  const carrito = carritos.find(c => c.id === cid);
  
  if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
  
  const productoExistente = carrito.products.find(p => p.product === pid);
  
  if (productoExistente) {
    productoExistente.quantity += quantity;
  } else {
    carrito.products.push({ product: pid, quantity });
  }
  
  fs.writeFileSync('carritos.json', JSON.stringify(carritos, null, 2));
  
  res.json(carrito.products);
  
})


module.exports = router;


  