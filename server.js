const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productController = require('./controllers/productController');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/catFoodDB')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// API endpoint to get and add products
app.get('/api/products', productController.getProducts);
app.post('/api/products', productController.addProduct);

const port = process.env.PORT || 3023;
app.listen(port, () => {
  console.log("App listening to: " + port);
});


