// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'Gourab@007',{
//     dialect: 'mysql', 
//     host: 'localhost'
// })


//connecting with mongodb

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect =(callback)=>{
    MongoClient.connect('mongodb+srv://27iyn4CPWyHnpmBp:27iyn4CPWyHnpmBp@cluster0.8oxbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client=> {
        console.log('connected')
        callback(client)
    })
    .catch(err => console.log(err))

}



module.exports = mongoConnect;