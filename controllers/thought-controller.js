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
   //get 1 Thought
   GetOneThought({params}, res) {
    Thought.findOne({_id: params.thoughtId})
            .select('-__v')
            .then(dbThoughtInfo => {
                if(!dbThoughtInfo) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
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
        return User.findOneAndUpdate({
            _id: params.userId
          }, {
            $push: {
              thoughts: _id
            }
          },
          //because we passed the option of new: true, we're receiving back the updated pizza (the pizza with the new comment included).
          {
            new: true
          }
        );
      })
      .then(dbUserInfo => {
        if (!dbUserInfo) {
          res.status(404).json({
            message: 'A User Cannot Be Found!'
          });
          return;
        }
        res.json(dbUserInfo);
      })
      .catch(err => res.json(err));
  },

  // addReactions({
  //   params,
  //   body
  // }, res) {
  //   Thought.findOneAndUpdate({
  //       _id: params.thoughtId
  //     }, {
  //       $push: {
  //         reactions: body
  //       }
  //     }, {
  //       new: true
  //     })
  //     .populate({
  //       path: 'reactions',
  //       select: '-__v'
  //   })
  //   .select('-__v')
  //     .then(dbUserInfo => {
  //       if (!dbUserInfo) {
  //         res.status(404).json({
  //           message: 'A Thought Cannot Be Found!'
  //         });
  //         return;
  //       }
  //       res.json(dbUserInfo);
  //     })
  //     .catch(err => res.json(err));
   //add Reaction
   addReactions({params, body}, res) {
    Thought.findByIdAndUpdate(
        { _id: params.thoughtId},
        { $push: {reactions: body}},
        { new: true, runValidators: true}
    )
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))

  },

  // remove reply
  removeReactions({
    params
  }, res) {
    Thought.findOneAndUpdate({
        _id: params.thoughtId
      }, {
        $pull: {
          replies: {
            replyId: params.reactionId
          }
        }
      }, {
        new: true
      })
      .then(dbUserInfo => res.json(dbUserInfo))
      .catch(err => res.json(err));
  },

  // remove comment
  removeThoughts({
    params
  }, res) {
    Thought.findOneAndDelete({
        _id: params.commentId
      })
      .then(removedThought => {
        if (!removedThought) {
          return res.status(404).json({
            message: 'A Thought Cannot Be Found!'
          });
        }
        return User.findOneAndUpdate({
          _id: params.userId
        }, {
          $pull: {
            thoughts: params.thoughtId
          }
        }, {
          new: true
        });
      })
      .then(dbUserInfo => {
        if (!dbUserInfo) {
          res.status(404).json({
            message: 'A User Cannot Be Found!'
          });
          return;
        }
        res.json(dbUserInfo);
      })
      .catch(err => res.json(err));
  }
};

module.exports = ThoughtController;