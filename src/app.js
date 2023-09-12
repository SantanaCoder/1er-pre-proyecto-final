const express = require('express');
const app = express();


const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');


app.use('/routes/products', productsRouter);
app.use('/routes/carts', cartsRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
