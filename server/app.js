const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();

const { authRouter, userRouter } = require('./routes');
const { PORT, MONGO_URI } = require('./config/config');

const app = express();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', userRouter);

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
