const { Schema, model } = require('mongoose');

const venueSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    site: { type: String, required: true },
    phone: { type: String, required: true },
    schema: { type: String, required: true },
    regionId: { type: String, required: true },
    districtId: { type: String, required: true },
});

const Venue = model('Venue', venueSchema);

module.exports = { Venue };