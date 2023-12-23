const AbonnementTypeModel = require("../models/AbonnementTypeModel");
const ClientModel = require("../models/ClientModel");
const DeviceModel = require("../models/DeviceModel");
const ServicePaiementModel = require("../models/ServicePaiementModel");
const validationSchema = require("./ModelSchemaValidator");

const validateClientAdd = async (req, res, next) => {
  console.log(req.body);
  const { error } = validationSchema.createModelSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const validateClientEdit = async (req, res, next) => {
  console.log(req);
  const { error } = validationSchema.editModelSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const validateDeviceAdd = async (req, res, next) => {
  console.log(req.body);
  const { error } = validationSchema.createDeviceSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await DeviceModel.findOne({ label: req.body.label });

  if (emailExist) {
    return res.status(400).json({ message: "device  already exists" });
  }

  next();
};
const validateAbonnTypeAdd = async (req, res, next) => {
  console.log(req.body);
  const { error } = validationSchema.createAbonnTypeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await AbonnementTypeModel.findOne({
    label: req.body.label,
  });

  if (emailExist) {
    return res.status(400).json({ message: "device  already exists" });
  }

  next();
};
const validateServicePaiementAdd = async (req, res, next) => {
  console.log(req.body);
  const { error } = validationSchema.createServicePaiSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await ServicePaiementModel.findOne({
    label: req.body.label,
  });

  if (emailExist) {
    return res
      .status(400)
      .json({ message: "service paiement  already exists" });
  }

  next();
};
module.exports = {
  validateClientAdd,
  validateClientEdit,
  validateDeviceAdd,
  validateAbonnTypeAdd,
  validateServicePaiementAdd,
};
