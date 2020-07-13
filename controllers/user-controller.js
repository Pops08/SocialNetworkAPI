const {
  User
} = require('../models');

const userController = {
  // get all users
  allUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({
        _id: -1
      })
      .then(dbUserInfo => res.json(dbUserInfo))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getOneUser({
    params
  }, res) {
    User.findOne({
        _id: params.id
      })
      .then(dbUserInfo => {
        // If no user is found, send 404
        if (!dbUserInfo) {
          res.status(404).json({
            message: 'A User Cannot Be Found!'
          });
          return;
        }
        res.json(dbUserInfo)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create User
  createUser({
    body
  }, res) {
    User.create(body)
      .then(dbUserInfo => res.json(dbUserInfo))
      .catch(err => res.status(400).json(err));
  },
  
  // update pizza by id
  updateUser({
    params,
    body
  }, res) {
    User.findOneAndUpdate({
        _id: params.id
      }, body, {
        new: true
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
      .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({
    params
  }, res) {
    User.findOneAndDelete({
        _id: params.id
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
      .catch(err => res.status(400).json(err));
  },

 //add a Friend 
 addFriend({params}, res) {
  User.findOneAndUpdate(
      { _id: params.id}, 
      { $push: {friends: params.friendId}},
      { new: true}
  )
      .populate({
          path: 'friends',
          select: '_id'
      })
      .select('-__v')
      .then(dbUserInfo => {
          console.log(dbUserInfo);
          if(!dbUserInfo) {
              res.status(404).json({ message: 'No user found with this id!'})
              return;
          }
          User.findOne({ _id: params.id })
              .then(returnUser => {
                  res.json(returnUser);
              })
      })
      .catch(err => {
          res.status(400).json(err)
      })
},

  //remove a Friend 
  removeFriend({params}, res) {
      console.log(params);
      User.findByIdAndUpdate(
          { _id: params.id}, 
          { $pull: {friends: params.friendId}},
          { new: true}
      )
          .populate({
              path: 'friends',
              select: '_id'
          })
          .select('-__v')
          .then(dbUserData => {
              if(!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!'})
                  return;
              }
              res.json(dbUserData)
          })
          .catch(err => {
              res.status(400).json(err)
          })
  }




}

module.exports = userController;