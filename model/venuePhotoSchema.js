const { Schema, model } = require('mongoose');

const venuePhotoSchema = new Schema({
    venue_id: { type: String, required: true },
    url: { type: String, required: true },
});

const VenuePhoto = model('VenuePhoto', venuePhotoSchema);

module.exports = { VenuePhoto };