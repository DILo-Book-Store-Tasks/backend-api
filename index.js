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
