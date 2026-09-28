const { Schema, model } = require('mongoose');

const venueTypeSchema = new Schema({
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    typeId: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
});

const VenueType = model('VenueType', venueTypeSchema);

module.exports = { VenueType };