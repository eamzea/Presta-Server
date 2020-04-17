const LogOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      res.status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = LogOut;
