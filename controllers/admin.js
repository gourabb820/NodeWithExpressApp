
const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    console.log("in the middleware 2");
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/edit-product', {
         pageTitle:"Add Products",
         path:"/add-product",
         editing: false
        });

    // res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
}

exports.postAddProduct = (req,res,next)=>{
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product =  new Product(null,title,imageUrl,description,price);
    product.save();
    // products.push({title: req.body.title})
    res.redirect('/');
}

exports.getEditProduct = (req,res,next)=>{   
    const editMode = req.query.edit; 
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findById(prodId, product =>{
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle:"Edit Products",
            path:"/edit-product",
            editing:editMode,
            product: product
           });
    })
  

    
}


exports.postEditProducts = (req,res,next)=>{
    //fetch new product 
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedimageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new  Product(prodId, updatedTitle,updatedimageUrl,updatedDesc,updatedPrice);
    console.log(updatedProduct)
    updatedProduct.save();
    res.redirect('/products');

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


