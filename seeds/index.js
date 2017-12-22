const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("../models");
const { User, Post, Story } = require("../models");

//for new names, etc.
const faker = require("faker");

//for database
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];

// Always use the MongoDB URL to allow
// easy connection in all environments
const mongodbUrl =
  process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    // initial sentence
    let story = [];

    let s = new Story({
      body: "Little did he know..."
    });
    story.push(s);

    // posts

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

    const promises = [];
    const collections = [posts, story];

    collections.forEach(collection => {
      collection.forEach(model => {
        const promise = model.save();
        promises.push(promise);
      });
    });

    return Promise.all(promises);

    // come back
  }
});
