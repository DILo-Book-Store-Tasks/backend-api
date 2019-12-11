const mongoose = require('mongoose')
let Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    books: [{
        book: {
            required: true,
            ref: "Book",
            type: mongoose.Types.ObjectId
        }
    }]
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order