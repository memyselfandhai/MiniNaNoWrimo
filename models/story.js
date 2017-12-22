var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema(
  {
    body: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
  },
  {
    timestamps: true
  }
);

var Story = mongoose.model("Story", StorySchema);

module.exports = Story;
