const express = require("express");
const router = express.Router();
const SignUp = require("../controllers/signup");
const Profile = require("../controllers/profile");
const Login = require("../controllers/login");

/* Routes */
router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/profile/:username", Profile);

module.exports = router;
