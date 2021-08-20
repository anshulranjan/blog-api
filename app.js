const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true}).then(() => console.log("DB connected"));
mongoose.connection.on("error", err => {
    console.log('DB connection error:' + err.message)
});
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
app.get('/', (req,res) =>{
  fs.readFile('docs/apiDocs.json' , (err, data) => {
    if(err)
    {
      return res.status(400).json({
        error:err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);

  });
});

app.use(morgan("test"));
const myOwnMiddleWare = (req, res, next) => {
    console.log("MiddleWare Applied");
    next();
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(myOwnMiddleWare);
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error":"Unauthorized"});
    }
  });
const port = process.env.PORT || 8000
app.listen(port, () => console.log('A Node Js API is listening on Port: ' + port));