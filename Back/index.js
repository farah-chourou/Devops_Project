const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();
const connectDB = require("./database/connectionDB");
const AllRoutes = require("./routes/AllRoutes");
const userModel = require("./models/UserModel");

const mongoose = require("mongoose");

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
/* const corsConfig = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig)); */
const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  connectDB();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

async function creatSuperAdmin() {
  try {
    const mdp = "27893558";
    const mdpCrypted = await bcrypt.hash(mdp, Number(process.env.SALT));
    const newUser = new userModel({
      email: "chouroufarah@gmail.com",
      nom: "Haroun",
      prenom: "jaballi",
      role: "SUPER_ADMIN",
      password: mdpCrypted,
    });

    await newUser.save();
    console.log("SuperAdmincreated");
  } catch (error) {
    return error;
  }
}
async function creatAdmin() {
  try {
    const existingUser = await userModel.findOne({
      role: "ADMIN",
    });

    if (!existingUser) {
      const mdp = "123456";
      const mdpCrypted = await bcrypt.hash(mdp, Number(process.env.SALT));
      const newUser = new userModel({
        email: "jaballino@hotmail.fr",
        nom: "lino",
        prenom: "jaballi",
        role: "ADMIN",
        password: mdpCrypted,
      });

      await newUser.save();
      console.log("SuperAdmincreated");
    }
  } catch (error) {
    return error;
  }
}
creatSuperAdmin();
creatAdmin();
app.use("/", AllRoutes);
