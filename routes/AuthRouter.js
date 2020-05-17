const express = require("express");
const authController = require("../controllers/AuthController");
const Authcontrol = authController();
authRouter = express.Router();

authRouter.post("/fbLogin", (req, res, next) => {
  Authcontrol.fbLogin(req, res, next);
});

module.exports = authRouter;
