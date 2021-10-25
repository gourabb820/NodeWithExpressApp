
const Product = require('../models/product');
// const mongodb =require('mongodb');


exports.getAddProduct = (req,res,next)=>{
    console.log("in the middleware 2");
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/edit-product', {
         pageTitle:"Add Products",
         path:"/add-product",
         editing: false
        });   
}

exports.postAddProduct = (req,res,next)=>{
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title,price,description,imageUrl);
    product.save()
    .then(result=>{
        console.log('created product');
        res.redirect('/products')
    }).catch(err=> console.log(err));
    
}

exports.getEditProduct = (req,res,next)=>{   
    const editMode = req.query.edit; 
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;    
   Product.findById(prodId)
    // Product.findByPk(prodId)
    .then( product =>{
        // const product = products[0];
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
    
    .catch(err=>console.log(err))
  

    
}


exports.postEditProducts = (req,res,next)=>{
    //fetch new product 
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedimageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    // const updatedProduct = new  Product(prodId, updatedTitle,updatedimageUrl,updatedDesc,updatedPrice);
    // console.log(updatedProduct)
    // Product.findById(prodId).then(product=>{
        const product = new Product(updatedTitle,updatedPrice,updatedimageUrl,updatedDesc, prodId)
        product.save()
        .then(result=> res.redirect('/products'))
        .catch(err=>console.log(err))
    // updatedProduct.save();
    

}

exports.getProducts = (req,res,next)=>{
   Product.fetchAll()
    .then(products=>{
        res.render('admin/products',{
            prods:products,
             pageTitle:'admin Products',
             path:"/add-products"
            });
        })
        .catch(err=> console.log(err))
}


exports.PostDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.deleteById(prodId).then(()=>{
        console.log('deleted');
        res.redirect('/products');
    }).catch(err=>console.log(err))
   
}

