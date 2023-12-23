const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeAbonModel = new Schema(
  {
    label: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TypeAbon", TypeAbonModel);
const TypeAbonName = mongoose.modelNames();
module.TypeAbonName = TypeAbonName;
