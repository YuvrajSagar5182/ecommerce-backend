const express = require('express');
const router = express.Router();

const sendEmail = require('../utils/sendEmail');
const emailTemplate = require('../utils/emailTemplate');

router.post('/contact', async (req, res) => {
    try {
        const { email, author, message } = req.body
        const send_to = process.env.EMAIL_USER;
        const sent_from = process.env.EMAIL_USER;
        // console.log('send_to', send_to)
        const subject = "Yuvi's Ecommerce Services";
        const message2 = emailTemplate(author, email, message)
        const result = await sendEmail(subject, message2, send_to, sent_from);

        if (result) {
            return res.status(200).json({
                status: true,
                msg: "Contact-us email has been sent successfully.",
            });
        } else {
            return res
                .status(403)
                .json({ status: false, msg: "Unable to send the email." });
        }

    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
        console.log(err);
    }
})

module.exports = router;