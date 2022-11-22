const { Schema, model } = require("mongoose");

const User = require("./User.model");

const owner = User

const commentSchema = new Schema(

  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User"

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
