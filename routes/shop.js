const express = require('express');
const path = require('path');
// const rootDir = require('../util/path');
const router = express.Router();
// const adminData = require('./admin');

const productController = require('../controllers/products');


router.get('/',productController.getProducts)

module.exports= router;