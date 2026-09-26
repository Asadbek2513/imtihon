const Joi = require('joi');

const eventValidation = Joi.object({
	name: Joi.string().trim().required(),
	photo: Joi.string().trim().required(),
	start_date: Joi.date().required(),
	start_time: Joi.string().trim().required(),
	finish_date: Joi.date().required(),
	finish_time: Joi.string().trim().required(),
	info: Joi.string().trim().required(),
	event_type_id: Joi.string().trim().required(),
	human_category_id: Joi.string().trim().required(),
	venue_id: Joi.string().trim().required(),
	lang_id: Joi.string().trim().required(),
	release_date: Joi.date().required()
});

module.exports = { eventValidation };