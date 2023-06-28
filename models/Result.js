const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User');
const Exam = require('./Exam');

const Result = sequelize.define("Result",
 {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Exam,
        key: 'id',
      },
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Result',
    tableName: 'results',
  }
);


// Define associations
Result.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Result.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

Result.sync({ force: false });
console.log("The table for the Result model was just (re)created!");

module.exports = Result;
