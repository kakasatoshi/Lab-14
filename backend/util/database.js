const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    // `mongodb+srv://kakasatoshi:Mnbv%400987@product.6wlp4.mongodb.net/?retryWrites=true&w=majority&appName=product`
    `mongodb+srv://kakasatoshi:Mnbv%400987@product.6wlp4.mongodb.net/Product?retryWrites=true&w=majority&appName=Product`
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
