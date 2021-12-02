const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema ({
    name: { type: String, required: true },
    sessions: { type: [String], required: true },
    description: { type: String, required: true },
}, { timestampts: true }, )

module.exports = mongoose.model( 'sessions', Session )