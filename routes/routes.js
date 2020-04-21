const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary");
const Logged = require("../controllers/logged");
const SignUp = require("../controllers/signup");
const Profile = require("../controllers/profile");
const Contact = require("../controllers/contact");
const AddStuff = require("../controllers/addStuff");
const StuffResults = require("../controllers/stuffResults");
const GetStuff = require("../controllers/getStuff");
const Login = require("../controllers/login");
const LogOut = require("../controllers/logOut");
const EditProfile = require("../controllers/editProfile");
const UploadPhoto = require("../controllers/uploadPhoto");

/* Routes */
router.get("/logged", Logged);
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/add-new-stuff", AddStuff);
router.get("/search/:stuff", StuffResults);
router.get("/stuff/:id", GetStuff);
router.get("/profile/:username", Profile);
router.get("/contact/:username", Contact);
router.post("/edit-profile/:username", EditProfile);
router.post("/upload-photo", uploader.single("img"), UploadPhoto);
router.post("/logout", LogOut);

module.exports = router;
