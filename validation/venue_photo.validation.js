const Joi = require('joi');

const venuePhotoValidation = Joi.object({
	 venue_id: Joi.string().hex().length(24).required(),
	url: Joi.string().trim().required()
});

module.exports = { venuePhotoValidation };