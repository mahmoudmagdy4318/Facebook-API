const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const util = require("util");

const { Schema } = mongoose;

const UserModel = new Schema({
  username: {
    type: "String",
    required: [true, "username is required"],
    index: { unique: [true, "this username is already taken!"] },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  phone: {
    type: "Number",
  },
});

//promisify jwt functions
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

//generate token
UserModel.methods.generateToken = function () {
  const token = sign(
    {
      username: JSON.stringify(this.username),
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

UserModel.statics.getCurrentUserFromToken = async function (token) {
  const payload = await verify(token, process.env.SECRET_KEY);
  const currentUser = await this.find({ username: eval(payload.username) });
  if (!currentUser) throw new Error("user not found!");
  currentuser = currentUser[0];
  return currentuser;
};

module.exports = mongoose.model("User", UserModel);
