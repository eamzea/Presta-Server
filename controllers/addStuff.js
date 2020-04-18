const moment = require("moment-timezone");
const Stuff = require("../models/Stuff");
const User = require("../models/User");

const SignUp = (req, res, next) => {
  const {
    name,
    quantity,
    imgPath,
    owner,
    available,
    realPrice,
    priceLend,
  } = req.body;

  try {
    User.findById(owner).then((user) => {
      Stuff.create({
        name,
        quantity,
        imgPath,
        owner,
        available,
        realPrice,
        priceLend,
      }).then((stuff) => {
        user.stuffs.push(stuff._id);
        res.status(200).json({ stuff, user });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = SignUp;
