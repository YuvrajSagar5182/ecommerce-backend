const express = require('express');
const bcrypt = require('bcrypt');

const EcommerceUser = require('../models/EcommerceUser')
const Cart = require('../models/cart');
const { generateToken } = require('../utils/generateToken');

const saltRounds = 10;

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const user = await EcommerceUser.findOne({ Email: userEmail });
        // console.log(user);
        if (!user) {
            return res
                .status(401)
                .json({ status: false, msg: "Invalid Email and Password." });
        }

        const validPassword = await bcrypt.compare(
            userPassword,
            user.password
        );

        if (!validPassword) {
            return res
                .status(401)
                .json({ status: false, msg: "Invalid Email and Password." });
        }
        const userData = {
            name: user.FirstName,
            userEmail: user.Email,
        }

        const token = generateToken(userData);
        // console.log("Toke from Login", token);

        res.status(200).json({ status: true, data: token, email: user.Email, userID: user._id });
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const userId = req.body.userID;
        if (!userId || userId === "undefined" || userId === 'null') {
            // console.log('HERE NULL USERID', userId);
            res.status(404).json({ message: 'Seems Unathorized', data: null, status: false });
            return
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(req.body.password, salt);

        const updateUser = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.email,
            password: bcryptPassword
        };

        const updated = await EcommerceUser.findOneAndUpdate({ _id: userId }, updateUser, { new: true })
        // console.log('updatedUser', updated);

        const userData = {
            name: updated.FirstName,
            userEmail: updated.Email,
        }
        const token = generateToken(userData);

        await Cart.findOne({ author: updated._id })
        res.status(200).json({ status: true, data: token, email: updated.Email, userID: updated._id });

    } catch (error) {
        console.log(error.message);
    }
})


router.get('/register', async (req, res, next) => {
    try {
        const randomNumber = Math.floor(Math.random() * 100001);
        const newUser = new EcommerceUser({
            FirstName: '',
            LastName: '',
            Email: `dummy${randomNumber}@gmail.com`,
            password: '',
        })

        const savedUser = await newUser.save();
        // console.log('\nID after parsing: ', savedUser._id.toString());

        const newCart = new Cart({
            items: [],
            totalQuantity: 0,
            author: ((savedUser._id).toString())

        })
        const savedNewCart = await newCart.save();
        // console.log(savedNewCart)

        res.status(200).json({ cart: savedNewCart, status: true, user: savedUser });

    } catch (err) {
        res.status(500).json({ cart: {}, status: false, message: err.message });
        console.log(err);
    }
})

module.exports = router