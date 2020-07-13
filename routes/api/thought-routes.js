const router = require('express').Router();
const {
    allThoughts,
    GetOneThought,
    addThoughts,
    removeThoughts,
    addReactions,
    removeReactions
  } = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(allThoughts);

//   // /api/thoughts/<userId>
// router.route('/:userId').post(addThoughts);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(GetOneThought)
  .post(addThoughts)
  // .put(addReactions)
  .delete(removeThoughts)
  
// /api/thoughts/<thoughtId>/reaction
router
.route('/:thoughtId/reactions')
.post(addReactions)
.delete(removeReactions)

  // router.route('/:userId/:thoughtId/:reactionId').delete(removeReactions);

module.exports = router;