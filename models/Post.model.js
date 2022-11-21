const { Schema, model, default: mongoose } = require("mongoose");
const User = require("./User.model");

// const owner = mongoose.model('User', userSchema)

// User.findOne({})

const postSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.O,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    Post: {
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
