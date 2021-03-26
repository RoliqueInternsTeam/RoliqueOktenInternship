const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { authRouter, userRouter } = require('./routes');
const { PORT, MONGO_URI } = require('./config/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.code || 500).json({
        message: err.message,
        ok: false
    });
});

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
