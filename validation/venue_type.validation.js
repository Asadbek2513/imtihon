const Joi = require('joi');

const venueTypeValidation = Joi.object({
	venueId: Joi.string().hex().length(24).required(),
	typeId: Joi.string().hex().length(24).required()
});

module.exports = { venueTypeValidation };