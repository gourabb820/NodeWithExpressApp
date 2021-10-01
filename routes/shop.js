const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();
const adminData = require('./admin');

router.get('/',(req,res,next)=>{
    // console.log("Always run");
    // res.sendFile(path.join(__dirname, '../', 'views','shop.html'));
    console.log('shop ',adminData.products);
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views','shop.html'));
    //using pug template engine
    res.render('shop',{prods:products, pageTitle:'Shop',path:"/"});
  
    // next();//Allows the req to move on the next middleware
})

module.exports= router;