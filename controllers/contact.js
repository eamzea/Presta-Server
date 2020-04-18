const User = require("../models/User");

const Contact = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.findOne({ username });

    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = Contact;
