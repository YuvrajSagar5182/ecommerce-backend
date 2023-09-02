const express = require('express');
const { verifyToken } = require('../utils/generateToken');

const router = express.Router();

router.get('/auth', async (req, res) => {
    try {
        const receivedToken = req.header("Authorization").split(" ")[1]
        const response = await verifyToken(receivedToken);
        return res.status(200).json({ msg: response })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
})

module.exports = router