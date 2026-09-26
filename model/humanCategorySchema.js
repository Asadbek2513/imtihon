const { Schema, model } = require('mongoose');

const humanCategorySchema = new Schema({
    name: { type: String, required: true },
    start_age: { type: Number, required: true },
    finish_age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
});

const HumanCategory = model('HumanCategory', humanCategorySchema);

module.exports = { HumanCategory };