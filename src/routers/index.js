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

router.use((req, res, next) => {
  res.status(404).send({
    error: true,
    message: "There is no Route. Get Back !!!!"
  });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
