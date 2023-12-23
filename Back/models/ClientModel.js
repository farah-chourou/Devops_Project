const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientModel = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    pays: { type: String, required: true },
    numTelephone: { type: Number, required: false },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientModel);
const ClientName = mongoose.modelNames();
module.ClientName = ClientName;
