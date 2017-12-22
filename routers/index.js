var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("../models");
var Post = mongoose.model("Post");
var Story = mongoose.model("Story");

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", async (req, res) => {
  let allPosts = await Post.find({}, {}, { sort: { votes: -1, createdAt: 1 } });
  // console.log("posts---------------");
  // console.log(posts);
  // console.log("posts---------------");

  //check to see if any posts have X upvotes
  //if so
  //  attach that to main story
  //  remove all posts from body

  let newStory;

  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].votes >= 10) {
      let newStory = await new Story({
        body: allPosts[i].body
      });
      console.log("NEW STORY", newStory);
    }
  }

  // console.log("NEW STORY", newStory);
  // newStory.posts = allPosts;

  // end of new code

  let story = await Story.findOne({});
  res.render("welcome/index", { allPosts, story });
});

module.exports = router;
