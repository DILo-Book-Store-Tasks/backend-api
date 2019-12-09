const express = require("express");
require("./db");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require('./src/routers/user')

const app = express();
const port = 8081;

// Package
app.use(cors());
app.use(express.json());
app.use(userRouter)
app.use(morgan("dev"));

app.listen(port, () => console.log(`Server Running on Port : ${port}`));
