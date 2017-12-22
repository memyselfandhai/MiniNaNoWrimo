const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deepPopulate = require("mongoose-deep-populate")(mongoose);

const StorySchema = new Schema(
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

StorySchema.plugin(deepPopulate /* more on options below */);

const Story = mongoose.model("Story", StorySchema);

module.exports = Story;
