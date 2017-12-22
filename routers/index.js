const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const Post = mongoose.model("Post");
const Story = mongoose.model("Story");
const User = mongoose.model("User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
router.use(passport.initialize());

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", async (req, res) => {
  let allPosts = await Post.find({}, {}, { sort: { votes: -1, createdAt: 1 } });
  let newStory = {};
  let currentUser = null;
  if (req.session.passport && req.session.passport.user) {
    currentUser = await User.findById(req.session.passport.user);
  }

  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].votes >= 10) {
      newStory = await new Story({
        body: allPosts[i].body
      });
      newStory.posts = allPosts;
      await newStory.save();
      // posts only showing deleted after refresh?
      await Post.remove({}, err => {
        if (err) return handleError(err);
      });
      await User.updateMany({
        remainingVotes: 10
      });
      break;
    }
  }

  let stories = await Story.find({}, {}, { sort: { createdAt: 1 } });
  res.render("welcome/index", { allPosts, stories, currentUser });
});

// ----------------------------------------
// Log in
// ----------------------------------------

router.get("/login", (req, res) => {
  res.render("welcome/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// ----------------------------------------
// Register
// ----------------------------------------

router.get("/register", (req, res) => {
  res.render("welcome/register");
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });
  await user.save(err => {});

  res.redirect("/login");
});

// ----------------------------------------
// Log out
// ----------------------------------------

var onDestroy = (req, res) => {
  req.session.passport.user = null;
  res.redirect("/login");
};
router.get("/logout", onDestroy);
router.delete("/logout", onDestroy);

module.exports = router;
