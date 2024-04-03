const {
  USER_EXISTS_ERROR,
  INVALID_CREDENTIALS_ERROR,
  UNAUTHORIZED_ERROR,
} = require("../middlewares/errors/ApiError");
const { User, BlacklistToken } = require("../models/models");
const {
  makePassword,
  comparePassword,
  signToken,
  verifyToken,
} = require("../utils/token.utils");

class AuthService {
  register = async ({ email, password, name = "" }) => {
    let user = await User.findOne({ where: { email } });
    if (user) {
      throw new USER_EXISTS_ERROR();
    }
    password = await makePassword(password);
    let newUser = await User.create({ email, password, name });
    await newUser.save();
    return { ...newUser.dataValues, password: null };
  };

  login = async ({ email, password }) => {
    let user = await User.findOne({ where: { email } });

    if (!user) {
      throw new INVALID_CREDENTIALS_ERROR();
    }
    let match = await comparePassword(password, user.password);

    if (!match) {
      throw new INVALID_CREDENTIALS_ERROR();
    }

    let access_token = await signToken({ user });

    return { user: { ...user.dataValues, password: null }, access_token };
  };

  logout = async (token) => {
    await BlacklistToken.create({ token });
    return "Logout Successfully";
  };

  refreshToken = async (token) => {
    const decoded = await verifyToken(token);
    if (!decoded) {
      throw new UNAUTHORIZED_ERROR();
    }
    const email = decoded?.user?.email || decoded?.email || decoded?.id?.email;
    let user = await User.findOne({ where: { email } });
    token = await signToken({ user });

    return { token };
  };
}

module.exports = AuthService;
