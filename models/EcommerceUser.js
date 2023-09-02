const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
});


module.exports = mongoose.model('Ecommerceuser', UserSchema);