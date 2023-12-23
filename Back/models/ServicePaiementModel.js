const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServicePaiementModel = new Schema(
  {
    label: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServicePaiement", ServicePaiementModel);
const ServicePaiementName = mongoose.modelNames();
module.ServicePaiementName = ServicePaiementName;
