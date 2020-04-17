const bcrypt = require("bcrypt");
const moment = require("moment-timezone");
const User = require("../models/User");

const SignUp = async (req, res, next) => {
  const { name, username, email, password, confirmPassword } = req.body;

  try {
    const makeid = () => {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 20; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const verificationCode = makeid();

    const expireCodeDate = moment()
      .tz("America/Mexico_City")
      .add(1, "days")
      .locale("es")
      .format("LLL");

    const since = moment().tz("America/Mexico_City").locale("es").format("LLL");

    if (
      name != "" &&
      username != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != "" &&
      password === confirmPassword
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        username,
        password: hashPass,
        email,
        verificationCode,
        expireCodeDate,
        since,
      });

      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ message: "Hubo un error inesperado, intenta de nuevo" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = SignUp;
