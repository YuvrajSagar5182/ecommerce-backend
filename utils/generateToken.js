const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

require('dotenv').config({ path: __dirname + '/../.env' });

const maxAge = 3 * 24 * 60 * 60;

const generateToken = (data) => {
    try {
        return jwt.sign(data, process.env.JWTPRIVATEKEY, {
            expiresIn: maxAge, //3 days from when it's created
        });
    } catch (error) {
        console.log(error);
    }
};

const verifyToken = async (accessToken) => {
    try {
        const token = accessToken.toString();
        const msg = await verify(token, process.env.JWTPRIVATEKEY);
        return msg;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
