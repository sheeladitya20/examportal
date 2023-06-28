const { DataTypes } = require('sequelize');
const sequelize = require('../connection');


const Exam = sequelize.define("Exam",
 {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Exam',
    tableName: 'exams',
  }
);
Exam.sync({ force: false });
console.log("The table for the Exam model was just (re)created!");

module.exports = Exam;