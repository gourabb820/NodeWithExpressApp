// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'Gourab@007',{
//     dialect: 'mysql', 
//     host: 'localhost'
// })


//connecting with mongodb

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect =(callback)=>{
    MongoClient.connect('mongodb+srv://27iyn4CPWyHnpmBp:27iyn4CPWyHnpmBp@cluster0.8oxbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client=> {
        console.log('connected')
        _db = client.db()
        callback()
    })
    .catch(err => {
        console.log(err);
        throw err;
    })

}

const getDb = ()=>{
    if(_db)
    return _db;
    throw 'No Database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;