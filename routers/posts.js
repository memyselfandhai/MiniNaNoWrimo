var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models");
var Post = mongoose.model("Post");

// ----------------------------------------
// New
// ----------------------------------------
router.get("/new", (req, res) => {
  res.render("posts/new");
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post("/new", (req, res) => {
  var postParams = {
    body: req.body.post,
    votes: 1
    // user: req.session.currentUser.id
  };

  var post = new Post(postParams);
  post
    .save()
    .then(post => {
      req.flash("success", "Post created!");
      res.redirect(`/`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Upvote
// ----------------------------------------
router.get("/upvote", async (req, res) => {
  await Post.findByIdAndUpdate(
    { _id: req.query.id },
    {
      $inc: { votes: 1 }
    }
  );
  res.redirect("back");
});

module.exports = router;
