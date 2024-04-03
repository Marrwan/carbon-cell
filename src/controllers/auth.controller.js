const AuthService = require("../services/auth.service");
const { withData, withMessage } = require("../utils/response.utils");
let auth_service = new AuthService();

const register = async (request, response, next) => {
  try {
    let { email, password, name } = request.validData;
    
    let data = await auth_service.register({ email, password, name  });
    return withData(response, data, 201);
  } catch (error) {
    next(error);
  }
};
const login = async (request, response, next) => {
  try {
    let {email, password} = request.validData;
    let data = await auth_service.login({email, password});
    return withData(response, data)
  } catch (error) {
    next(error);
  }
};

const logout = async (request, response, next) => {
    try {
     let token = request.headers.authorization?.split(" ")[1];
      let data = await auth_service.logout(token);
      return withData(response, data)
    } catch (error) {
      next(error);
    }
  };

const refreshToken = async (request, response, next) => {
  try {
    let {token} = request.validData;
    const data = await auth_service.refreshToken(token); 
    return withData(response, data); 
  } catch (error) {
    next(error); 
  }
};

module.exports = { register, login, refreshToken, logout };
