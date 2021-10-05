const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

const errorController =  require('./controllers/error')
const sequelize = require('./util/database');
const Product = require('./models/product');
const User  = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();

const  server = http.createServer(app);
//setting pug template engine global config adding
//telling express to use pug as view engine to render dynamic content
// app.set('view engine','pug',);

//using ejs template
app.set('view engine','ejs',);

//where to find our view=> view folder
app.set('views','views');

//parse req body stream to readble format like json
app.use(bodyParser.urlencoded({extended:false}));

//serve static file like css pas the location
app.use(express.static(path.join(__dirname, 'public')));;

app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user = user;
        next();
    }).catch(err=>console.log(err))
})

app.use(adminRoutes);
app.use(shopRoute);

//db crud operation
// db.execute('SELECT * from products').then((result)=>{
//     console.log(result[0]);
//    }).catch((err)=>{
//        console.log(err);
//    })
   

//handling 404
app.use('/',errorController.get404);

//association

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart,{through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through: OrderItem})
// const sequelize = require('./util/database');
//sync with all model and create table for them
sequelize.sync().then(result =>{
   return User.findByPk(1)
    console.log(result)
}).then(user=>{
    if(!user){
        User.create({name: 'max', email: 'test@gmail.com'})
    }
    return user
}).then(user=> {

    // console.log(user)
   return user.createCart();

}).then(cart=>{
    server.listen(3000)
})
.catch(err=>{
    console.log(err)
})






