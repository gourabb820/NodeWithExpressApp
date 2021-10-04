
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req,res,next)=>{
    Product.findAll().then(products=>{
        res.render('shop/product-list',{
            prods:products,
             pageTitle:'Shop',
             path:"/products"
            });
       }).catch(err=> console.log(err))        
     
}

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;
    // Product.find({where:{id:prodId}}).then().catch()
    Product.findByPk(prodId)
    .then((product)=>{
        res.render('shop/product-detail',
        {
            product: product ,
            pageTitle: product.title, 
            path: '/products'});                
    })
    .catch(err => console.log(err))
        
}

exports.getIndex = (req,res,next) =>{
   Product.findAll().then(products=>{
    res.render('shop/index',{
        prods:products,
         pageTitle:'Shop',
         path:"/"
        });
   }).catch(err=> console.log(err))        
 }

exports.getCart = (req,res,next)=>{
    Cart.getCart(cart =>{
        Product.fetchAll(products =>{
            const cartProducts =[];
            for (product of products ){
                const cartProductData = cart.products.find(prod=> prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData:product, qty:cartProductData.qty})
                }
            }
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your Cart',
                products:cartProducts          
            })
        })
       
    })
  
}

exports.postCart = (req,res,next)=>{
const prodId = req.body.productId;
// console.log(hi, prodId);
Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId, product.price);
})
res.redirect('/cart');
    // res.render('shop/cart',{
    //     path: '/cart',
    //     pageTitle: 'Your Cart'
    // })
}

exports.postCartDeleteProduct = (req,res,next)=>{
const prodId = req.body.productId;
Product.findById(prodId, product =>{
    Cart.deleteProduct(prodId);
    res.redirect('/cart');
})


}




exports.getOrders = (req,res,next)=>{
    res.render('shop/order',{
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}


exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}