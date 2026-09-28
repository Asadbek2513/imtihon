const { Schema, model } = require('mongoose');

const venuePhotoSchema = new Schema({
    venue_id: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    url: { type: String, required: true },
});

const VenuePhoto = model('VenuePhoto', venuePhotoSchema);

module.exports = { VenuePhoto };