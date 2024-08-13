const User=require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide all credentials");
    }

    const existUser = await User.findOne({ email: email });

    if (!existUser) {
      return res.status(500).json({ message: "User not exist", success: false });
    }

    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res.status(500).json({ message: "Please enter valid password", success: false });
    }

    const tokenData = {
      _id: existUser._id,
      email: existUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h",
    });

    const tokenOption = {
      httpOnly: false,
      secure: false,
    };

    res
      .status(200)
      .cookie("token", token, tokenOption)
      .json({ message: "User login successfully", success: true,  token:token,data:existUser });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true, success: false });
  }
}

module.exports = userSignInController;
