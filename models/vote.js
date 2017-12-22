var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    votable: {
      type: Schema.Types.ObjectId,
      ref: "Postable"
    },
    value: Number
  },
  {
    timestamps: true
  }
);

var Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
