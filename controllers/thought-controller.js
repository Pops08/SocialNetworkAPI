const {
  Thought,
  User
} = require('../models');

const ThoughtController = {
  //get all Thoughts
  allThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({
        _id: -1
      })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

   //Find 1 Thought
   GetOneThought({params}, res) {
    Thought.findOne({_id: params.thoughtId})
            .then(dbThoughtInfo => {
                if(!dbThoughtInfo) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtInfo);
            })
            .catch(err => res.status(400).json(err));
},

  // add thought to user
  addThoughts({
    params,
    body
  }, res) {
    Thought.create(body)
      .then(({
        _id
      }) => {
        return User.findOneAndUpdate(
          {_id: body.userId}, 
          {$push: {thoughts: _id}},
          {new: true}
        );
      })
      .then(dbUserInfo => {
        if (!dbUserInfo) {
          res.status(404).json({
            message: 'A User Cannot Be Found To Add A thought!'
          });
          return;
        }
        res.json(dbUserInfo);
      })
      .catch(err => res.json(err));
  },

  addReactions({
    params,
    body
  }, res) {
    console.log(params, body)
    Thought.findByIdAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {reactions: body}}, 
      {new: true}
      )
      .then(dbUserInfo => {
        if (!dbUserInfo) {
          res.status(404).json({
            message: 'A Thought Cannot Be Found!'
          });
          return;
        }
        res.json(dbUserInfo);
      })
      .catch(err => res.json(err));
    },


  // remove reply
  removeReactions({
    params
  }, res) {
    console.log(params)
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$pull: {reactions: {reactionId: params.reactionId}}}, 
      {new: true})
      .then(dbUserInfo => res.json(dbUserInfo))
      .catch(err => res.json(err));
  },

  removeThoughts({params}, res) {
    Thought.findOneAndDelete({_id: params.thoughtId})
            .then(dbThoughtInfo => {
                if(!dbThoughtInfo) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtInfo);
            })
            .catch(err => res.status(400).json(err));
},



};

module.exports = ThoughtController;