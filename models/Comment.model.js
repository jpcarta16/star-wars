const { Schema, model, default: mongoose } = require("mongoose");



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
    description: {
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
