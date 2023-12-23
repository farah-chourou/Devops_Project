const express = require("express");
const dynamicRouter = express.Router();
const mongoose = require("mongoose");
const verifToken = require("../middelwares/VerifToken");
const validator = require("../middelwares/validator");

const { UserName } = require("../models/UserModel");
const { ServicePaiementName } = require("../models/ServicePaiementModel");
const { DeviceName } = require("../models/DeviceModel");
const { ClientName } = require("../models/ClientModel");
const { TypeAbonName } = require("../models/AbonnementTypeModel");
const { AbonnementName } = require("../models/AbonnementModel");
const AbonnementModel = require("../models/AbonnementModel");
// const uploadImageToCloudinary = require("../middelwares/imageMiddleware");

let models = [
  "User",
  "Abonnement",
  "TypeAbon",
  "Client",
  "Device",
  "ServicePaiement",
];

const middlewareFunctions = {
  User: [verifToken.isUser],
  Abonnement: [verifToken.isUser],
  TypeAbon: [verifToken.isSuperAdmin],
  Client: [verifToken.isUser],
  Device: [verifToken.isSuperAdmin],
  ServicePaiement: [verifToken.isUser],
};
const middlewareFunctionsPost = {
  User: [verifToken.isUser],
  Client: [verifToken.isSuperAdmin, validator.validateClientAdd],
  Abonnement: [verifToken.isUser],
  ServicePaiement: [verifToken.isUser, validator.validateServicePaiementAdd],
  Device: [verifToken.isSuperAdmin, validator.validateDeviceAdd],
  TypeAbon: [verifToken.isSuperAdmin, validator.validateAbonnTypeAdd],
};

const middlewareFunctionsPut = {
  User: [verifToken.isUser],
  ServicePaiement: [verifToken.isSuperAdmin],
  Device: [verifToken.isSuperAdmin],
  TypeAbon: [verifToken.isSuperAdmin],
  Client: [verifToken.isSuperAdmin, validator.validateClientEdit],
  Abonnement: [verifToken.isUser],
};

models.forEach((modelName) => {
  // Get the model
  const Model = mongoose.model(modelName);
  const middlewares = middlewareFunctions[modelName] || [];
  const middlewaresPost = middlewareFunctionsPost[modelName] || [];
  const middlewaresPut = middlewareFunctionsPut[modelName] || [];

  // Create
  dynamicRouter.post(`/${modelName}/add`, middlewaresPost, async (req, res) => {
    const newModel = new Model(req.body);
    try {
      await newModel.save();
      res.status(200).json({
        Message: "data created suucessfully",
        Success: true,
        data: newModel,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Read
  dynamicRouter.get(`/${modelName}/getAll`, middlewares, async (req, res) => {
    try {
      models = await Model.find({}).sort({ createdAt: -1 });

      return res
        .status(200)
        .json({ Message: "Data found successfully", data: models });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  dynamicRouter.get(
    `/${modelName}/getOne/:id`,
    middlewares,
    async (req, res) => {
      try {
        models = await Model.findById(req.params.id);

        if (models) {
          return res
            .status(200)
            .json({ Message: "data found successfully ", data: models });
        } else {
          res.status(404).send("Not found");
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );

  // Update
  dynamicRouter.put(
    `/${modelName}/update/:id`,
    middlewaresPut,
    async (req, res) => {
      try {
        const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!model) {
          return res.status(404);
        }

        res.status(200).json({
          Message: "data updated suucessfully",
          Success: true,
          data: model,
        });
      } catch (error) {
        return res.status(400).send(error);
      }
    }
  );

  // Delete
  dynamicRouter.delete(
    `/${modelName}/delete/:id`,
    middlewares,
    async (req, res) => {
      try {
        if (modelName === "Client") {
          const existAbonn = await AbonnementModel.findOne({
            clientID: req.params.id,
          });
          if (existAbonn) {
            return res
              .status(400)
              .json({ message: "Vous ne pouvez pas supprimer ce client " });
          }
        }
        const model = await Model.findByIdAndDelete(req.params.id);
        if (!model) {
          return res.status(404).send();
        }
        return res
          .status(200)
          .json({ Message: "data deleted successfully ", data: model });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );
});

module.exports = dynamicRouter;
