const mongoose = require("mongoose");
const { roles } = require("../utils/roles");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },

    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: roles.SUPER_ADMIN,
      enum: [roles.SUPER_ADMIN, roles.ADMIN],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModel);
const UserName = mongoose.modelNames();
module.UserName = UserName;
