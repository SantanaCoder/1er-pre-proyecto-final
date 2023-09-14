const express = require('express');
const fs = require('fs');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());
app.use(express.urlencoded({ extended: true}))


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
