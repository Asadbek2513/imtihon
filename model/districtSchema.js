const { Schema, model } = require('mongoose');

const districtSchema = new Schema({
    name: { type: String, required: true },
    region_id: { type: Schema.Types.ObjectId, ref: 'Region', required: true },
});

const District = model('District', districtSchema);

module.exports = { District };