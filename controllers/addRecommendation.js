const Recommendation = require("../models/Recommendation");
const User = require("../models/User");
const moment = require("moment-timezone");

const AddRecommendation = async (req, res, next) => {
  const { userId } = req.params;
  const { name, details, rate } = req.body;

  try {
    const author = await User.findById(name);

    User.findByIdAndUpdate(userId).then((user) => {
      const date = moment()
        .tz("America/Mexico_City")
        .locale("es")
        .format("LLL");

      Recommendation.create({
        owner: user._id,
        date,
        name: author._id,
        username: author.username,
        details,
        rate,
      }).then((recommendation) => {
        user.recommendations.push(recommendation);
        user.save();
        res.status(200).json({ message: "Recomendación agregada con éxito" });
      });
    });
  } catch (err) {
    res.status(400).json({ message: error });
  }
};

module.exports = AddRecommendation;
