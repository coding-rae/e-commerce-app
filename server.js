//server.js
import express from "express";
const app = express();


/* 
import { createRequire } from "module";
const require = createRequire(import.meta.url); */

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});


/* //Include route files
const usersRoute = require('./routes/user');
const productsRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart')
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');

//Use routes

app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/orders', orderRoute);
app.use('/cart', cartRoute);
app.use('/index', indexRoute);
app.use('/auth', authRoute);
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
