const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/timer-sessions', { useNewUrlParser: true }).catch( error => { console.error('Connection Error', error.message) });

const db = mongoose.connection;

module.exports = db;