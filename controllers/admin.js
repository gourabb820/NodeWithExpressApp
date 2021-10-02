
const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    console.log("in the middleware 2");
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', {
         pageTitle:"Add Products",
         path:"/add-product"
        });

    // res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
}

exports.postAddProduct = (req,res,next)=>{
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product =  new Product(title,imageUrl,description,price);
    product.save();
    // products.push({title: req.body.title})
    res.redirect('/');
}


exports.getProducts = (req,res,next)=>{
    Product.fetchAll(products=>{
        res.render('admin/products',{
            prods:products,
             pageTitle:'admin Products',
             path:"/products"
            });
        })
}


