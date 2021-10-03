const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');
// const products = [];



// /add-product => GET
router.get('/add-product',adminController.getAddProduct);

// /add-product => POST
router.post('/add-product',adminController.postAddProduct);

router.get('/add-products',adminController.getProducts);

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProducts);

module.exports=router
// exports.routes =router;
// exports.products = products;