const express = require("express");
const router = express.Router();
const SignUp = require("../controllers/signup");
const Profile = require("../controllers/profile");
const Login = require("../controllers/login");
const EditProfile = require("../controllers/editProfile");

/* Routes */
router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/profile/:username", Profile);
router.post("/edit-profile/:username", EditProfile);

module.exports = router;
