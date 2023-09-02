const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    items:
        [
            {
                title: String,
                quantity: Number,
                totalPrice: Number,
                price: Number,
                image: String,
            }
        ],
    totalQuantity: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Ecommerceuser'
    }
});


module.exports = mongoose.model('Cart', CartSchema);