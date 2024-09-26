const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
const Transaction = require('./Models/Transaction');
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());


app.post('/API/transaction', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 40000,
    })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({ name, description, datetime, price });
    res.json(transaction);
});

app.get('/API/transactions', async (req, res)=>{
    await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 40000,
    })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

    const transactions= await Transaction.find();
    res.json(transactions);
});

app.listen(4000);
// xho1wpGVHOoGQvHa
