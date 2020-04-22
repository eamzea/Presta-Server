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

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          res.status(200).json(user);
        } else {
          res.status(200).json({ message: "Tu contraseña no coincide" });
        }
      } else {
        res.status(200).json({ message: "No hemos encontrado este usuario" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = Login;
