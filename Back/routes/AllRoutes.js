const express = require("express");
const router = express.Router();
const UserRoute = require("./UserRoutes");
const AbonnRoute = require("./AbonnRoutes");

const dynamicRouter = require("./DynamicRoutes");
router.use("/api", dynamicRouter);
router.use("/user", UserRoute);
router.use("/abonnnement", AbonnRoute);

module.exports = router;
