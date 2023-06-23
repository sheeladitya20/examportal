const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("teacher", "student"),
    allowNull: false,
  },

});


User.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports = User;