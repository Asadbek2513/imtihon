const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    start_date: { type: Date, required: true },
    start_time: { type: String, required: true },
    finish_date: { type: Date, required: true },
    finish_time: { type: String, required: true },
    info: { type: String, required: true },
    event_type_id: { type: Schema.Types.ObjectId, ref: 'EventType', required: true },
    human_category_id: { type: Schema.Types.ObjectId, ref: 'HumanCategory', required: true },
    venue_id: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    lang_id: { type: Schema.Types.ObjectId, ref: 'Lang', required: true },
    release_date: { type: Date, required: true },
});

const Event = model('Event', eventSchema);

module.exports = { Event };