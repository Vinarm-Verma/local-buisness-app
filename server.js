const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
 
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/business', require('./routes/business'));
    app.use('/api/review', require('./routes/review'));
    app.use('/api/item', require('./routes/item'));
    app.use('/api/order', require('./routes/order'));

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});