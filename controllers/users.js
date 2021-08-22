const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) next(err);
      req.flash("success", `Welcome to Yelpcamp! ${registeredUser.username}`);
      res.redirect("/campgrounds");
    });
  } catch (e) {
    if (e.code == "11000") {
      req.flash("error", "The User with that email already exists");
    } else {
      req.flash("error", e.message);
    }
    res.redirect("register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  const redirectUrl = req.session.returnTo || "/campgrounds";
  req.flash("success", `Welcome back! ${req.user.username}`);
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "See you soon !!");
  res.redirect("/campgrounds");
};
