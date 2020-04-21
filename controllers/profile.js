const User = require("../models/User");
const Stuff = require("../models/Stuff");

const Profile = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.findOne({ username });

    const stuffs = await Stuff.find({ owner: profile._id });

    if (
      req.session.currentUser &&
      req.session.currentUser.username === profile.username
    ) {
      res.status(200).json({ profile, owner: true, stuffs });
    } else {
      res.status(200).json({ profile, owner: false, stuffs });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = Profile;
