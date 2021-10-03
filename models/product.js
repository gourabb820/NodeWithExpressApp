const db = require('../util/database')
const products =[];
// const fs= require('fs');
// const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart')

module.exports  = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

   save(){
    return db.execute("INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)",
    [this.title,this.price,this.imageUrl,this.description])
}

static deleteById(id) {
  }


    static fetchAll(){

    // getProductsFromFile(callback);
       return db.execute('SELECT * FROM products')
   }

   static findById(id){
     return db.execute('SELECT * FROM products WHERE products.id =?',[id]);
   }
}