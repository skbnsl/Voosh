const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

const cookieParser = require('cookie-parser');


app.use(cookieParser());


app.use(express.json());


//for routes
app.use('/', require('./routes/user'));

app.listen(port, function(err){
          if(err){
                    console.log("error in port");
                    return;
          }
          console.log(`server is running on ${port}`);
});