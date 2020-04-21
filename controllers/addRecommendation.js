const Recommendation = require("../models/Recommendation");
const User = require("../models/User");

const AddRecommendation = (req, res, next) => {
  const { username } = req.params;
  const { date, name, details, rate } = req.body;

  try {
    User.find({ username }).then((user) => {
      Recommendation.create({
        owner: user._id,
        date,
        name,
        details,
        rate,
      }).then((recommendation) => {
        user.recommandations.push(recommendation);
        user.save();
        res.status(200).json({ message: "Recomendación agregada con éxito" });
      });
    });
  } catch (err) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = AddRecommendation;
