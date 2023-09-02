const express = require('express');

const Cart = require('../models/cart');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const userID = req.body.userID
        // console.log('USer ID', userID, typeof (userID));

        if (!userID || userID === "undefined" || userID === 'null') {
            // console.log('HERE NULL USERID', userID);
            res.status(500).json({ message: 'User not found', status: false });
            return
        }

        const CartData = await Cart.findOne({ author: userID });

        if (!CartData) {
            const newCart = new Cart({
                items: [],
                totalQuantity: 0,
                author: userID

            })
            const savedCart = await newCart.save();
            res.json({ cart: savedCart, status: 'true' });
            return;
        }
        res.json({ cart: CartData, status: true });
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Cart.findById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
})

router.put('/', async (req, res, next) => {
    try {

        const carts = await Cart.findByIdAndUpdate(req.body.id, { items: req.body.items, totalQuantity: req.body.totalQuantity }, { new: true });
        if (!carts) {
            // console.log('ERROR FINDING the CART DATA');
            return res.status(404).json({ error: 'Cart Items not found' });
        }
        res.json(carts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router