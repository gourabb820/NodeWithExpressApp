const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const products = [];

// /admin/add-product => GET
router.get('/add-product',(req,res,next)=>{
    console.log("in the middleware 2");
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', {pageTitle:"Add Products", path:"/add-product"})

    // res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// /admin/product => POST
router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    products.push({title: req.body.title})
    res.redirect('/');
});

exports.routes =router;
exports.products = products;