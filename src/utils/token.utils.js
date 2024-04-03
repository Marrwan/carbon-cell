const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { VALIDATION_ERROR, UNAUTHORIZED_ERROR } = require("../middlewares/errors/ApiError");
const { BlacklistToken } = require("../models/models");

const makePassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  let hashedpassword = await bcrypt.hash(password, salt);

  return hashedpassword;
};

const comparePassword = async (string, hashed) => {
  let match = await bcrypt.compare(string, hashed);
  return match;
};

const signToken = async (data) => {
  let token = jwt.sign(data, process.env.SECRET, {expiresIn:"1d"});
  return token;
};

const verifyToken = async (token) => {
  try {
    let blacklisttoken = await BlacklistToken.findOne({where:{token}})
    if(blacklisttoken){
        throw new UNAUTHORIZED_ERROR("invalid token", 400, "Invalid Token")
    }
    let match = jwt.verify(token, process.env.SECRET);
    return match;
  } catch (error) {
    if(error?.message != new UNAUTHORIZED_ERROR().message){
       error.message = "Invalid Token"
    }
    throw new VALIDATION_ERROR("jwt error", 400, error?.message );
  }
};
module.exports = { makePassword, comparePassword, signToken, verifyToken };
