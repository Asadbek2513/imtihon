const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    hashed_password: { type: String, required: true },
    email: { type: String, required: true },
    birth_date: { type: Date, required: true },
    gender: { type: String, required: true },
    lang_id: { type: String, required: true },
    hashed_refresh_token: { type: String, default: null },
});

const Customer = model('Customer', customerSchema);

module.exports = { Customer };