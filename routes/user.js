const express = require("express");
const router = express.Router();

const {
  handleUserSignUp,
  handleUserSignIn,
  handleUserLogOut,
} = require("../controllers/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", handleUserSignIn);
router.post("/signup", handleUserSignUp);

router.get("/logout", handleUserLogOut);

module.exports = router;
