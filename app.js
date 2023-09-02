const PORT = 8080
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db')
const productRoutes = require('./routes/ecommerce');
const cartRoutes = require('./routes/cart')
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth')
const checkOutboundRoutes = require('./routes/checkout')
const contactRoutes = require('./routes/contact')

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', registerRoutes)
app.use('/', checkOutboundRoutes)
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


app.get('/', async (req, res) => {
    res.send("<h1>Hello from Yuvi's Ecommerce's Backend</h1>")
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
