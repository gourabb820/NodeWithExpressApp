const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

const errorController =  require('./controllers/error')
const db = require('./util/database');

const app = express();
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

app.use(adminRoutes);
app.use(shopRoute);

//db crud operation
db.execute('SELECT * from products').then((result)=>{
    console.log(result[0]);
   }).catch((err)=>{
       console.log(err);
   })
   

//handling 404
app.use('/',errorController.get404);

const  server = http.createServer(app);

server.listen(3000)
