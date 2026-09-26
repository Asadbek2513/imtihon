const Joi = require('joi');

const seatTypeValidation = Joi.object({
    name: Joi.string().trim().required()
});

module.exports = { seatTypeValidation };