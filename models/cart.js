const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir,'data','cart.json');

module.exports = class Cart {
   static addProduct(id,productPrice){
       //fetch the prev cart
       fs.readFile(p, (err,fileContent)=>{
        let cart ={products: [],totalPrice:0};   
        if(!err){
               cart = JSON.parse(fileContent);

           }
           //analyze the cart => find existing product
           const existingProductIndex = cart.products.findIndex(prod =>prod.id===id);
           const existingProduct = cart.products[existingProductIndex]
           let updatedProduct;
           if(existingProduct){
               /// increse quantity
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products =[...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
           }else{
                 //add new product
                 updatedProduct = {id: id, qty:1}
                 cart.products = [...cart.products, updatedProduct]
           }
           cart.totalPrice = cart.totalPrice + +productPrice;
           //cart.products = [...cart.products, updatedProduct]
           fs.writeFile(p,JSON.stringify(cart),(err)=>{
            console.log(err);
           })
       })
       
      
   }
}