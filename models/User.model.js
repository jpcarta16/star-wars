const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    type: {
      type: String,
      enum: ['Jedi', 'Sith']
    },
    role: {
      type: String,
      enum: ['Soldier', 'Master'],
      default: 'Soldier'
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
