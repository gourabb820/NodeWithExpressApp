const products =[]
const fs= require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart')
const p = path.join(rootDir,'data','products.json');
const getProductsFromFile  = callback =>{
    
    fs.readFile(p, (err,fileContent)=>{//async
        if(err){
           return  callback([]);
        } else
        callback(JSON.parse(fileContent));
    })
}

module.exports  = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

   save(){
    
       //saving products in array
      
       getProductsFromFile(products=>{
        if(this.id){
            //update            
            const existingProductIndex = products.findIndex(prod => prod.id === this.id);
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;            
            fs.writeFile(p, JSON.stringify(updatedProducts),(err)=>{//converting js obj to json
                console.log(err)
               });

        }else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products),(err)=>{//converting js obj to json
            console.log(err)
           });

        }
    
    //    products.push(this);
    //    const p = path.join(rootDir,'data','products.json');
    //    fs.readFile(p, (err,fileContent)=>{
    //        let products = [];
    //      if(!err){
    //         console.log(fileContent);
    //         products= JSON.parse(fileContent); //converting json to js object
    //      }
    //      products.push(this);
    //      fs.writeFile(p, JSON.stringify(products),(err)=>{//converting js obj to json
    //          console.log(err)
    //      });
   });
}

static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }


    static fetchAll(callback){
       //fetching products
    //    const p = path.join(rootDir,'data','products.json');
    //    fs.readFile(p, (err,fileContent)=>{//async
    //        if(err){
    //            callback([]);
    //        }
    //        callback(JSON.parse(fileContent));
    //    })
    getProductsFromFile(callback);
       
   }

   static findById(id, callback){
       getProductsFromFile(products =>{
           const product  = products.find( p => p.id ===id );
           callback(product);
       })
   }
}