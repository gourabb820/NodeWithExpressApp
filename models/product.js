const products =[]
const fs= require('fs');
const path = require('path');
const rootDir = require('../util/path');

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
    constructor(t){
        this.title = t;
    }

   save(){
       //saving products in array
       getProductsFromFile(products=>{
        products.push(this);
        fs.writeFile(p, JSON.stringify(products),(err)=>{//converting js obj to json
        console.log(err)
       });
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
}