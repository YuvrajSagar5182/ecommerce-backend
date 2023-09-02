const mongoose = require('mongoose');
const Ecommerce = require('../models/ecommerce');
const Cart = require('../models/cart');
const connectDB = require('../config/db');
const EcommerceUser = require('../models/EcommerceUser');

const connectFirst = async () => {
    await connectDB()
};

const seedDB = async () => {
    await connectFirst();
    // await Ecommerce.deleteMany({});
    // const respFromAPI = await fetch(`https://fakestoreapi.com/products`);
    // const data = await respFromAPI.json()
    // // console.log(data[0].rating.rate, data[0].rating.count)
    // for (let prod of data) {
    //     console.log(prod.title, prod.price, prod.description, prod.category, prod.rating, '\n')
    //     const product = new Ecommerce({
    //         title: prod.title,
    //         price: prod.price,
    //         description: prod.description,
    //         category: prod.category,
    //         image: prod.image,
    //         rating: {
    //             rate: prod.rating.rate,
    //             count: prod.rating.count
    //         },
    //     })
    //     await product.save();
    // }

    await Cart.deleteMany({});
    await EcommerceUser.deleteMany({})
    // const cartData = new Cart({
    //     items:
    //         [
    //             {
    //                 title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //                 quantity: 2,
    //                 price: 109.95,
    //                 totalPrice: 109.95 * 2,
    //                 image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"

    //             }
    //         ],
    //     totalQuantity: 2,
    //     author: '64eda44ee2d3459221b8a6f3'
    // });
    // await cartData.save();
    // console.log(cartData);

}

seedDB().then(() => {
    mongoose.connection.close();
}).catch(err => {
    console.log(err.message);
})