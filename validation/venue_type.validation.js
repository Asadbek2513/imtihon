const Joi = require('joi');

const venueTypeValidation = Joi.object({
	venueId: Joi.string().trim().required(),
	typeId: Joi.string().trim().required()
});

module.exports = { venueTypeValidation };