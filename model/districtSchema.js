const { Schema, model } = require('mongoose');

const districtSchema = new Schema({
    name: { type: String, required: true },
    region_id: { type: String, required: true },
});

const District = model('District', districtSchema);

module.exports = { District };