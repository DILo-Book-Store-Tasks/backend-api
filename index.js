const express = require("express");
require("./db");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 8081;

const userRouter = require('./src/routers/user')


// Package
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(userRouter)

app.listen(port, () => console.log(`Server Running on Port : ${port}`));
