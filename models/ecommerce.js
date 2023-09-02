const mongoose = require('mongoose');
const { Schema } = mongoose;

const EcommerceSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating:
    {
        rate: Number,
        count: Number
    }

});


module.exports = mongoose.model('Ecommerce', EcommerceSchema);