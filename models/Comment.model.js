const { Schema, model, default: mongoose } = require("mongoose");

const User = require("./User.model");


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
