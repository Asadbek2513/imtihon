const Joi = require('joi');

const eventTypeValidation = Joi.object({
	name: Joi.string().trim().required(),
	parent_event_type_id: Joi.string().allow(null, '')
});

module.exports = { eventTypeValidation };