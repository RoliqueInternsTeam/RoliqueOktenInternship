const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, MONGO_URI } = require('./config/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT || 5000, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('server error', e.message);
        process.exit(1);
    }
}

start();
