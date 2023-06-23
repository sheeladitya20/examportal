const userDb = require("../models/User");

const getUsers = async (req, res) => {
  let users = await userDb.findAll({});
  res.status(200).send(users);
};
const postUsers = async (req, res) => {
let users = await userDb.create({
  Name,
  email,
  password: hashedPassword,
  type});
  res.status(200).send(users);
};



module.exports = {
    getUsers,
    postUsers,
}