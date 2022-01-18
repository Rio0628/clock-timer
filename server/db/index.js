const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.REACT_APP_DB_USERNAME}:${process.env.REACT_APP_DB_PASSWORD}@newcluster.a2laf.mongodb.net/Timer-Sessions?retryWrites=true&w=majority`, { useNewUrlParser: true }).catch( error => { console.error('Connection Error', error.message) });

const db = mongoose.connection;

module.exports = db;