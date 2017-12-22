var mongoose = require("mongoose");
var mongooseeder = require("mongooseeder");
var models = require("../models");
var { User, Post, Story } = require("../models");

//for new names, etc.
var faker = require("faker");

//for database
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];

// Always use the MongoDB URL to allow
// easy connection in all environments
var mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    // -----------------------
    // initial story sentence
    // -----------------------
    let story = [];

    let s = new Story({
      body: "Little did he know..."
    });
    story.push(s);

    // -----------------------
    // posts
    // -----------------------
    //
    let posts = [];

    for (var i = 0; i < 10; i++) {
      let p = new Post({
        // user: user,
        votes: 1,
        depth: 0,
        body: faker.lorem.paragraph()
      });
      posts.push(p);
    }

    var users = [];
    for (let i = 1; i < 11; i++) {
      var user = new User({
        username: `foobar${i}`,
        email: `foobar${i}@gmail.com`,
        password: `foobar${i}`
      });
      users.push(user);
    }

    var promises = [];
    var collections = [posts, story, users];

    collections.forEach(collection => {
      collection.forEach(model => {
        var promise = model.save();
        promises.push(promise);
      });
    });

    return Promise.all(promises);

    // come back
  }
});
