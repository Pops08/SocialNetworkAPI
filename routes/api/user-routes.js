const router = require('express').Router();
const {
    allUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/user
router
  .route('/')
  .get(allUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;