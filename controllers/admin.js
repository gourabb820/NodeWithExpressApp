
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
}

exports.postAddProduct = (req,res,next)=>{
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
    // Product.create({
        title: title,
        price: price,
        imageUrl:imageUrl,
        description:description
    }).then(result=>{
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
    req.user.getProducts({where:{id:prodId}})
    // Product.findByPk(prodId)
    .then( products =>{
        const product = products[0];
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
    Product.findByPk(prodId).then(product=>{
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedimageUrl;
        product.description = updatedDesc;
        return product.save();
        
    }
    ).then(result=> res.redirect('/products'))
    .catch(err=>console.log(err))
    // updatedProduct.save();
    

}

exports.getProducts = (req,res,next)=>{
    req.user
    .getProducts()
    .then(products=>{
        res.render('admin/products',{
            prods:products,
             pageTitle:'admin Products',
             path:"/products"
            });
        })
        .catch(err=> console.log(err))
}


exports.PostDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.findByPk(prodId).then(product=>{
        return  product.destroy();
    }).then(result=>{
        console.log(result);
        res.redirect('/products');
    }).catch(err=>console.log(err))
   
}

