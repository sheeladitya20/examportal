const User = require("../models/User");
const userDb = require("../models/User");

const getUsers = async (req, res) => {
  let users = await userDb.findAll({});
  res.status(200).send(users);
};

async function postUsers(req, res) {
  try {
    const { name, email, password, type } = req.body;

    // Check if the user already exists
    const existingUser = await userDb.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create the user
    const user = await User.create({
      name,
      email,
      password,
      type
    });

    return res.status(201).json({user});
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { name, email, password, type } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name;
    user.email = email;
    user.password = password;
    user.type = type;

    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error during user update:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error during user deletion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getUsers,
  postUsers,
  updateUser,
  deleteUser,
};
