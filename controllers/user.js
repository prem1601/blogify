const User = require("../models/user");

async function handleUserSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

async function handleUserSignUp(req, res) {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });

    return res.render("signin", {
      success: "User created successfully! Please Login.",
    });
  } catch (error) {
    return res.render("signup", {
      error: "Provide required valid datails.",
    });
  }
}

function handleUserLogOut(req, res) {
  return res.clearCookie("token").redirect("/");
}

module.exports = {
  handleUserSignIn,
  handleUserSignUp,
  handleUserLogOut,
};
