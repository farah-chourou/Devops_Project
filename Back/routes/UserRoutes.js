const express = require("express");
const router = express.Router();
const authController = require("../auth/AuthentificationController");
const verifToken = require("../middelwares/VerifToken");

router.post("/login", authController.Login);
router.get("/getUserByToken", verifToken.isUser, authController.GetUserByToken);
router.get("/refreshToken", authController.RefreshToken);
router.put(
  "/change_password",
  verifToken.isAdmin,
  authController.ChangePassword
);
router.post("/forgot", authController.ForgotPassword);
module.exports = router;
