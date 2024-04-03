const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");



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
