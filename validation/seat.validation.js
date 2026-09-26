const Joi = require('joi');

const seatValidation = Joi.object({
	sector: Joi.string().trim().required(),
	row_number: Joi.number().required(),
	number: Joi.number().required(),
	venue_id: Joi.string().trim().required(),
	seat_type_id: Joi.string().trim().required(),
	location_in_schema: Joi.string().trim().required()
});

module.exports = { seatValidation };