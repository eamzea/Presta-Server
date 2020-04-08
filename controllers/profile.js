const User = require("../models/User");

const Profile = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.findOne({ username });

    console.log(profile);

    res.status(200).json(profile);

    // if (profile.username === req.session.currentUser) {
    //   let user = { ...profile, owner: true };
    //   console.log(user);
    //   res.status(200).json(user);
    // } else {
    //   let user = { ...profile, owner: false };
    //   console.log(user);
    //   res.status(200).json(user);
    // }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = Profile;
