// const express = require("express");
// require("./db");
// const cors = require("cors");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const db = require("./config/keys").mongoURI; //impor key
// mongoose
//     .connect (db, {useNewUrlParser: true})
//     .then (() => console.log("DB Konek"))
//     .catch (err => console.log(err))


// const app = express();
// const port = 8081;

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// // Package
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));


// //lisen server
// app.listen(port, () => console.log(`Server Running on Port : ${port}`))


const m = require("mongoose");

m.connect(
  `mongodb+srv://${process.env.MONGO_USERS}:${process.env.MONGO_PASWD}@cluster0-8w3b6.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => console.log(err.message)
);
