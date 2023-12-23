const GenereteToken = require("../functions/GenerateToken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const GeneratePassword = require("../functions/GeneratePassword");
const Mail_Sender = require("../functions/MailSneder");

const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Please verify your email",
        success: false,
      });
    }

    const passMatch = await bcrypt.compare(password, user?.password);
    if (!passMatch) {
      return res.status(400).json({
        message: "Please verify your password",
        success: false,
      });
    }

    const token = GenereteToken.AccessToken({ _id: user._id }, "3000s");
    const refreshToken = GenereteToken.RefreshToken({ _id: user._id }, "3000h");

    return res.status(200).json({
      message: "Logged successfully",
      success: true,
      user: user,
      token,
      refreshToken,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetUserByToken = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const RefreshToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }
  const refreshToken = req.headers.authorization.replace("Bearer", "").trim();
  if (!refreshToken) {
    return res.status(403).json({ error: "Access denied,token missing!" });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ err: "RefreshToken expired ! " });
      }

      delete user.iat;
      delete user.exp;
      const accessToken = GenereteToken.AccessToken(user, "3600s");
      res.send({
        token: accessToken,
      });
    });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const _id = req.user._id;
    const { password, oldpassword } = req.body;
    console.log(password);

    const passMatch = await bcrypt.compare(oldpassword, req.user.password);
    if (!passMatch) {
      return res.status(400).json({
        Message: "old password is not correct",
        Success: false,
      });
    }

    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateUser = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "updated successfully", data: updateUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        Message: "there's no user with that email",
        Success: false,
      });
    }

    const password = GeneratePassword();
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: existUser._id },
      {
        $set: {
          password: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }

    // SENDING THE LOGIN AND PASSWORD TO USER WITH MAIL
    let subject = "Password Recover";
    let content = `
            <div>
            <h2>Hello ${existUser.nom} ${existUser.prenom},</h2>
            <p>we recieved a request to recover your password</p>
            <p>your new password is : <b>${password}</b> </p>
            </div>`;
    await Mail_Sender(existUser.email, content, subject);

    return res
      .status(200)
      .json({ Message: "new password sent to your mail box" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
module.exports = {
  Login,
  GetUserByToken,
  RefreshToken,
  ChangePassword,
  ForgotPassword,
};
