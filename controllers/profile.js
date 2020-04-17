const User = require("../models/User");

const Profile = async (req, res, next) => {
  const { username } = req.params;

  console.log(req.params);

  try {
    const profile = await User.findOne({ username });

    if (
      req.session.currentUser &&
      req.session.currentUser.username === profile.username
    ) {
      res.status(200).json({ profile, owner: true });
    } else {
      res.status(200).json({ profile, owner: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = Profile;
