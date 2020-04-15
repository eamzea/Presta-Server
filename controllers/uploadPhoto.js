const uploadPhoto = async (req, res, next) => {
  const file = req.file;

  try {
    console.log(req.file);

    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = uploadPhoto;
