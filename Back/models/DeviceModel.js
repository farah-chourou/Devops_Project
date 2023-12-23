const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceModel = new Schema(
  {
    label: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", DeviceModel);
const DeviceName = mongoose.modelNames();
module.DeviceName = DeviceName;
