
const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    console.log("in the middleware 2");
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', {
         pageTitle:"Add Products",
         path:"/add-product"
        });

    // res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
}

exports.postAddProduct = (req,res,next)=>{
    console.log(req.body);
    const product =  new Product(req.body.title);
    product.save();
    // products.push({title: req.body.title})
    res.redirect('/');
}

exports.getProducts = (req,res,next)=>{
    // console.log("Always run");
    // res.sendFile(path.join(__dirname, '../', 'views','shop.html'));
    // console.log('shop ',adminData.products);
    // const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views','shop.html'));
    //using pug template engine

    const products =  Product.fetchAll((products=>{
        res.render('shop',{
            prods:products,
             pageTitle:'Shop',
             path:"/"
            });
    }));
    
  
    // next();//Allows the req to move on the next middleware
}