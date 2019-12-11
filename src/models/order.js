const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    books: [
      {
        book: {
          required: true,
          ref: "Book",
          type: mongoose.Types.ObjectId
        }
      }
    ],
    is_done: {
      type: Boolean,
      required: true,
      default: false
    },
    total: {
      required: true,
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
