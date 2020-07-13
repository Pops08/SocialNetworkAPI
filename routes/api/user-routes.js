const router = require('express').Router();
const {
    allUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/user
router
  .route('/')
  .get(allUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router
  .route('/:id')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

  // /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;