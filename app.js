const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');
const app = express();
//setting pug template engine global config adding
//telling express to use pug as view engine to render dynamic content
app.set('view engine','pug',);

//where to find our view=> view folder
app.set('views','views');

//parse req body stream to readble format like json
app.use(bodyParser.urlencoded({extended:false}));

//serve static file like css pas the location
app.use(express.static(path.join(__dirname, 'public')));;

app.use(adminData.routes);
app.use(shopRoute);



//handling 404
app.use('/',(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname , 'views', '404.html'))
    res.status(404).render('404', {pageTitle: "Page Not Found"});
});



// app.use('/',(req,res,next)=>{
//     console.log("Always run");
//     next();//Allows the req to move on the next middleware
// })



// app.use('/add-product',(req,res,next)=>{
//     console.log("in the middleware 2");
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// })

// app.post('/product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// })

// app.use('/',(req,res,next)=>{
//     console.log("in the middleware 2");
//     res.send('<h1>hello from express</h1>');
// })
const  server = http.createServer(app);

server.listen(3000)
