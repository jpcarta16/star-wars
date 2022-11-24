const { Schema, model, default: mongoose } = require("mongoose");

const postSchema = new Schema(

  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
    }],

    imageUrl: {
      type: String,
    },

    title: {
      type: String,
      required: true
    },

    post: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);


const Post = model("Post", postSchema);

module.exports = Post;
