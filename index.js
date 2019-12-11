const express = require("express");
require("./db");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./src/routers/user");
const roleRouter = require("./src/routers/role");
const genreRouter = require("./src/routers/genre");
const bookRouter = require("./src/routers/book");
const orderRouter = require("./src/routers/orders");

const app = express();
const port = 8081;

app.use(morgan("dev"));

// Package
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(roleRouter);
app.use(genreRouter);
app.use(bookRouter);
app.use(orderRouter);

app.listen(port, () => console.log(`Server Running on Port : ${port}`));