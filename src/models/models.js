const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

/**
* @swagger
*
*components:
*  schemas:
*    LoginRequest:
*      type: object
*      required:
*        - email
*        - password
*      properties:
*        email:
*          type: string
*          description: User's email address
*          format: email
*          example: user@example.com
*        password:
*          type: string
*          description: User's password
*          minLength: 6
*          writeOnly: true  # Hide password in response
*
*  securitySchemes:
*    bearerAuth:
*      type: http
*      scheme: bearer
*      bearerFormat: JWT  # Indicate JWT format for token
*
*security:
*  - bearerAuth: []
* 
*/
const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
  }

  
});

const BlacklistToken = sequelize.define("BlacklistToken", {
token : {
    type: DataTypes.TEXT,
    unique: true
}
});
 
(async () => {
  try {
    await sequelize.sync();
    console.log('Models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  } 
})();

module.exports = {User, BlacklistToken}
