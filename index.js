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


const express = require("express");
require("./db");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 8081;

// Package
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => console.log(`Server Running on Port : ${port}`));
