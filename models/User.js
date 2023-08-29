const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+(\.\w{2,3})+/, "invalid email"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectID,
        ref: "thought"
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectID,
        ref: "user"
      },
    ]
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

//this refers to itself
userSchema.virtual("friendCount").get(function () {
  return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;
