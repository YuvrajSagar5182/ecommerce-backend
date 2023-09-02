const express = require('express');
const router = express.Router();
const EcommerceUser = require('../models/EcommerceUser')
const Cart = require('../models/cart');

router.post('/checkout', async (req, res) => {
    try {
        const userID = req.body.userID;
        if (!userID || userID === "undefined" || userID === 'null') {
            // console.log('HERE NULL USERID', userID);
            res.status(500).json({ message: 'Seems Unathorized', message: null, status: false });
            return
        }
        const userData = await EcommerceUser.findOne({ _id: userID })
        // console.log(userData)

        const updateData = {}
        updateData.FirstName = userData.FirstName || req.body.FirstName;
        updateData.LastName = userData.LastName || req.body.LastName;

        if (userData.Email.startsWith('dummy')) {
            updateData.Email = req.body.email || userData.Email;
        }

        if (updateData) {
            const user = await EcommerceUser.findByIdAndUpdate(userID, updateData, { new: true });
            console.log('user', user)
        }

        const userCart = await Cart.findOneAndUpdate(
            { author: userID },
            { $set: { items: [], totalQuantity: 0 } },
            { new: true }
        );
        // console.log('userCart', userCart);

        res.status(200).json({ cart: userCart, message: 'Checkout done successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Checkout unsuccessfully' })
    }
})

module.exports = router;