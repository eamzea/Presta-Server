const bcrypt = require("bcrypt");
const User = require("../models/User");

const Login = async (req, res, next) => {
  const { credential, password } = req.body;

  try {
    if (req.session.currentUser) {
      const user = req.session.currentUser;
      res.status(200).json(user);
    } else {
      const user = await User.findOne({ username: credential });

      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = Login;
