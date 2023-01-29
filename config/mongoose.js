const mongoose = require('mongoose');

//conncet to the database
mongoose.connect('mongodb+srv://skbnsl:voosh@cluster0.a4zva2x.mongodb.net/?retryWrites=true&w=majority');

//mongoose.connect('mongodb+srv://skbnsl2:bansal12@ecomapi.gnwo7av.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

//checking the error
db.on('error',console.error.bind( console,"error in database"));

//check that database is connected or not
// db.once('open', function(){
//           console.log('database connected: MongoDB');
// });

module.exports = db;