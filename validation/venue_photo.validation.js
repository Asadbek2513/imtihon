const Joi = require('joi');

const venuePhotoValidation = Joi.object({
	venue_id: Joi.string(),
	url: Joi.string().trim().required()
});

module.exports = { venuePhotoValidation };