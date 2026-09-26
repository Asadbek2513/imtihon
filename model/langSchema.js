const { Schema, model } = require('mongoose');

const langSchema = new Schema({
    name: { type: String, required: true }
});

const Lang = model('Lang', langSchema);

module.exports = { Lang };