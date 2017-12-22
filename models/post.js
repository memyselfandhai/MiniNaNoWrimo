const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deepPopulate = require("mongoose-deep-populate")(mongoose);

const PostSchema = new Schema(
  {
    votes: Number,
    body: "String",
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

PostSchema.plugin(deepPopulate /* more on options below */);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
