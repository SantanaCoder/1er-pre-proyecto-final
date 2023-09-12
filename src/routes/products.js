const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());


let productos = [
  { id: 1, title: 'Guitarra', description: 'guitarra electrica', code: 'P001', price: 10, status: true, stock: 10, category: 'guitarras', thumbnails: [] },
  { id: 2, title: 'bajo', description: 'bajo acustico', code: 'P002', price: 20, status: true, stock: 20, category: 'cuerdas', thumbnails: [] },
  { id: 3, title: 'bateria', description: 'bateria completa', code: 'P003', price: 30, status: true, stock: 30, category: 'percusion', thumbnails: [] },
 
];


function generarNuevoID() {
  return productos.length > 0 ? Math.max(...productos.map(item => item.id)) + 1 : 1;
}

router.post('/', (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;

 
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

o
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
    thumbnails: thumbnails || []
  };

  
  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
});

module.exports = router;
