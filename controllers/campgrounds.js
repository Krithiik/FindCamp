const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
  req.flash("success", "Successfully made a new Campground!");
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const foundCampground = await Campground.findById(id)
    .populate({ path: "reviews", populate: "author" })
    .populate("author");
  if (!foundCampground) {
    req.flash("error", "Cannot Find that Campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground: foundCampground });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot Find that Campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const updatedCampground = await Campground.findByIdAndUpdate(
    id,
    { ...req.body.campground },
    { new: true }
  );
  req.flash(
    "success",
    `Successfully updated Campground ${updatedCampground.title}`
  );
  res.redirect(`/campgrounds/${updatedCampground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Campground");
  res.redirect("/campgrounds");
};
