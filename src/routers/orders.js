const express = require("express");
const router = new express.Router();
const Order = require("../models/order");
const auth = require("../middleware/auth");

router.post("/orders", auth.auth, async (req, res, next) => {
  const order = new Order(req.body);
  await order
    .save()
    .then(result => {
      res.status(201).send({
        success: true,
        message: "Order Berhasil",
        order: result
      });
    })
    .catch(error => {
      res.status(500).send({ success: false, message: { error: error } });
    });
});

router.get("/orders", async (req, res, next) => {
  await Order.find({})
    .select("_id books createdAt updatedAt")
    .populate("books.book", "book_name genre author price")
    .populate("user", "_id name email")
    .exec()
    .then(orders => {
      res.status(200).send({
        success: true,
        message: {
          orders: orders.map((v, i) => {
            return {
              order: v
            };
          })
        }
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: {
          error: error
        }
      });
    });
});

module.exports = router;
