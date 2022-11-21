const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    uowner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'

    },
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
