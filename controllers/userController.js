const userDb = require("../models/User");

const getUsers = async (req, res) => {
  let users = await userDb.findAll({});
  res.status(200).send(users);
};


module.exports = {
    getUsers
}