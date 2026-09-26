const Joi = require('joi');

const bookingValidation = Joi.object({
	card_id: Joi.string().trim().required(),
	createdAt: Joi.date(),
	finished: Joi.date().allow(null),
	payment_methood_id: Joi.string().trim().required(),
	delivery_method_id: Joi.string().trim().required(),
	discount_coupon_id: Joi.string().allow(null, ''),
	status_id: Joi.string().default('pending')
});

module.exports = { bookingValidation };