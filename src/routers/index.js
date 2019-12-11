const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const roleRouter = require("./role");
const genreRouter = require("./genre");
const bookRouter = require("./book");
const orderRouter = require("./orders");

router.use(userRouter);
router.use(roleRouter);
router.use(genreRouter);
router.use(bookRouter);
router.use(orderRouter);

module.exports = router;
