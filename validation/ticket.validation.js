const Joi = require('joi');

const ticketValidation = Joi.object({
	event_id: Joi.string().trim().required(),
	seat_id: Joi.string().trim().required(),
	price: Joi.number().required(),
	service_fee: Joi.number().required(),
	status_id: Joi.string().trim().required(),
	ticket_type: Joi.string().trim().required()
});

module.exports = { ticketValidation };