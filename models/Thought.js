const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionsSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
    {
      toJSON: 
      {
        getters: true
      }
    }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    //We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
    id: false
  }
);

//Total count of reactions and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
  
  // create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;