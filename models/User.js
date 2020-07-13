const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please Enter A Valid Email Address']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    //We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
    id: false
  }
);

 // get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
  
  // create User model using UserSchema
const User = model('User', UserSchema);

// exporting User model
module.exports = User;