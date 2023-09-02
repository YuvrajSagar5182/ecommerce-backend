const express = require('express');
const Ecommerce = require('../models/ecommerce');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const Ecommercedata = await Ecommerce.find({});
        res.json(Ecommercedata);
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Ecommerce.findById(id);
        res.json(product);
    } catch (error) {
        console.log(error);
        next()
    }
})

module.exports = router