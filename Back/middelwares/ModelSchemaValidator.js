const Joi = require("joi");

const createModelSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().allow(""),
  pays: Joi.string().required(),
  numTelephone: Joi.number().allow(""),
  note: Joi.string().allow(""),
});

const editModelSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().allow(""),
  pays: Joi.string().required(),
  numTelephone: Joi.string(),
  note: Joi.string().allow(""),
});

const createAbonnSchema = Joi.object({
  application: Joi.string(),
  adresseMac: Joi.string().required(),
  dateDebut: Joi.string(),
  dateFin: Joi.string(),
  periode: Joi.string(),
  clientID: Joi.string(),
  deviceID: Joi.string(),
  typeAbonnID: Joi.string(),
});
const createDeviceSchema = Joi.object({
  label: Joi.string().required(),
});
const createAbonnTypeSchema = Joi.object({
  label: Joi.string().required(),
});
const createServicePaiSchema = Joi.object({
  label: Joi.string().required(),
});

module.exports = {
  createModelSchema,
  editModelSchema,
  createDeviceSchema,
  createAbonnTypeSchema,
  createServicePaiSchema,
};
