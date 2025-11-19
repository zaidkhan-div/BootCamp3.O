const express = require("express");
const router = express.Router();
const {
  registerCompany,
  registerUser,
  login,
  updateProfile,
} = require("../controller/auth.controller");
const upload = require('../middleware/multer')


router.post("/register-company", registerCompany);
router.post("/register-user", registerUser);
router.post("/login", login);

router.put("/update-profile", upload.single('profileImage'), updateProfile);


module.exports = router;
