const Joi = require('joi');

// Validation for Agency
const agencyValidation = Joi.object({
  name: Joi.string().required(),
  address1: Joi.string().required(),
  address2: Joi.string().allow(''), // Optional
  state: Joi.string().required(),
  city: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^\d{10}$/).required(), // Only allow 10-digit phone numbers
});

// Validation for Client
const clientValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^\d{10}$/).required(), // Only allow 10-digit phone numbers
  totalBill: Joi.number().required(),
});

// Validation for Combined Agency and Clients
const createAgencyAndClientsValidation = Joi.object({
  agency: agencyValidation.required(),
  clients: Joi.array().items(clientValidation).min(1).required(),
});

// Validation for Client Update
const updateClientValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\d{10}$/),
  totalBill: Joi.number(),
}).or('name', 'email', 'phoneNumber', 'totalBill'); // Require at least one field

module.exports = {
  createAgencyAndClientsValidation,
  updateClientValidation,
};
