var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
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
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    discriminatorKey: "kind"
  }
);

PostSchema.virtual("score").get(function() {
  return this.votes.reduce((sum, vote) => {
    return (sum += vote.value);
  }, 0);
});

PostSchema.pre("save", function(next) {
  if (this.parent) {
    this.depth = this.parent.depth + 1;
  }
  next();
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
