const { Schema, model } = require('mongoose');

const venueTypeSchema = new Schema({
    venueId: { type: String, required: true },
    typeId: { type: String, required: true }, 
});

const VenueType = model('VenueType', venueTypeSchema);

module.exports = { VenueType };