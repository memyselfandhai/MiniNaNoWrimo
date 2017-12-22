const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Story = mongoose.model("Story");

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
  const postParams = {
    body: req.body.post,
    votes: 1
    // user: req.session.currentUser.id
  };

  const post = new Post(postParams);
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
  let user = await User.findById(req.session.passport.user);
  if (user.remainingVotes > 0) {
    await Post.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $inc: { votes: 1 }
      }
    );
    await User.findByIdAndUpdate(
      { _id: req.session.passport.user },
      {
        $inc: { remainingVotes: -1 }
      }
    );
  }
  res.redirect("back");
});

// ----------------------------------------
// Individual Post
// ----------------------------------------
router.get("/:id", async (req, res) => {
  console.log(" STORIES ---------------");
  console.log(await Story.findById(req.params.id).populate("post"));
  // Y U NO POPULATE?!?!
  //find story by id
  //  be sure to deep populate
  //pass to view
  let story = await Story.findById(req.params.id).populate("post");
  res.render("posts/show", { story });
});

module.exports = router;
