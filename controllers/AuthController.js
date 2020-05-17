const UserModel = require("../models/UserModel");
const axios = require("axios");
module.exports = function authController() {
  const fbLogin = async (req, res, next) => {
    //fetch user data from access token
    const result = await axios.get(
      `https://graph.facebook.com/v7.0/${req.body.id}?fields=name,email&access_token=${req.body.access_token}`
    );
    const username = await result.data.name;
    const email = await result.data.email;
    const user = new UserModel({ username, email });
    // await user.save();
    const token = await user.generateToken();
    res.json({ user, token, message: "your mobile number is required" });
  };

  return { fbLogin };
};
