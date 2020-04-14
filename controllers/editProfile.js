const User = require("../models/User");
const bcrypt = require("bcrypt");

const EditProfile = async (req, res, next) => {
  const usernameP = req.params.username;
  const { name, username, phone, email, password, confirmPassword } = req.body;

  console.log(req.body);

  try {
    const profile = await User.findOne({ username: usernameP });

    console.log(profile);

    if (password == "" && confirmPassword == "") {
      let profileEdited = await User.findByIdAndUpdate(profile._id, {
        name,
        username,
        phone,
        email,
      });

      let newProfile = await User.findById(profileEdited._id);

      req.session.currentUser = newProfile;

      res.status(200).json(newProfile);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      let profileEdited = await User.findByIdAndUpdate(profile._id, {
        name,
        username,
        phone,
        email,
        password: hashPass,
      });

      let newProfile = await User.findById(profileEdited._id);

      req.session.currentUser = newProfile;

      res.status(200).json(newProfile);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = EditProfile;
