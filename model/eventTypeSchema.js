const { Schema, model } = require('mongoose');

const eventTypeSchema = new Schema({
    name: { type: String, required: true },
    parent_event_type_id: { type: String, default: null },
});

const EventType = model('EventType', eventTypeSchema);

module.exports = { EventType };