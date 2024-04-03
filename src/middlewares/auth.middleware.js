
const { UNAUTHORIZED_ERROR } = require("./errors/ApiError");
const { verifyToken } = require("../utils/token.utils");
const { User } = require("../models/models");


const isLogin = async (request, response, next) => {
    try {
    
      const access_token = request.headers.authorization?.split(" ")[1];
      // 2. Verify refresh token validity (using a separate secret key)
      if(!access_token){
        throw new UNAUTHORIZED_ERROR()
      }
      const decoded = await verifyToken(access_token);
      if(!decoded){
        throw new UNAUTHORIZED_ERROR()
      }
      const email = decoded?.user?.email || decoded?.email || decoded?.id?.email;
      // 3. Fetch user from database
      let the_user = await User.findOne({where: {email}, attributes: {exclude: ["password"]}});
     
      
      request.user = the_user.dataValues;
      next();
    } catch (error) {
      next(error);
    }
  
};

module.exports = { isLogin };
