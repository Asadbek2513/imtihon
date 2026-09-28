const Joi = require('joi');

const bookingValidation = Joi.object({
	card_id: Joi.string().hex().length(24).required(),
	createdAt: Joi.date(),
	finished: Joi.date().allow(null),
	payment_methood_id: Joi.string().hex().length(24).required(),
	delivery_method_id: Joi.string().hex().length(24).required(),
	discount_coupon_id: Joi.string().allow(null, ''),
	status_id: Joi.string().default('pending')
});

module.exports = { bookingValidation };