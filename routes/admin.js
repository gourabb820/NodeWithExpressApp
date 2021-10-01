const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const productsController = require('../controllers/products');
// const products = [];



// /admin/add-product => GET
router.get('/add-product',productsController.getAddProduct);

// /admin/product => POST
router.post('/add-product',productsController.postAddProduct);

module.exports=router
// exports.routes =router;
// exports.products = products;