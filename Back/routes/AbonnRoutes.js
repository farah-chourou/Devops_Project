const express = require("express");
const router = express.Router();
const AbonnController = require("../controllers/AbonnementController");
const verifToken = require("../middelwares/VerifToken");
const { uploadDoc } = require("../functions/CloudinaryUploadImage");
const validator = require("../middelwares/validator");

router.post("/add", uploadDoc, AbonnController.AddAbonnement);
router.get("/getByClientID/:id", AbonnController.getAbonnemtByClientID);

module.exports = router;
