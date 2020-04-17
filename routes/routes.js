const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary");
const SignUp = require("../controllers/signup");
const Profile = require("../controllers/profile");
const Login = require("../controllers/login");
const LogOut = require("../controllers/logout");
const EditProfile = require("../controllers/editProfile");
const UploadPhoto = require("../controllers/uploadPhoto");

/* Routes */
router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/profile/:username", Profile);
router.post("/edit-profile/:username", EditProfile);
router.post(
  "/upload-profile-photo",
  uploader.single("profilePic"),
  UploadPhoto
);
router.post("/logout", LogOut);

module.exports = router;
