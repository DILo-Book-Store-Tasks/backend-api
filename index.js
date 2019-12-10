const express = require("express");
require("./db");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./src/routers/user");
const roleRouter = require("./src/routers/role");
const genreRouter = require("./src/routers/genre");
const bookRouter = require("./src/routers/book");

const app = express();
const port = 8081;

// Package
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(roleRouter);
app.use(genreRouter);
app.use(bookRouter);
app.use(morgan("dev"));

app.listen(port, () => console.log(`Server Running on Port : ${port}`));
