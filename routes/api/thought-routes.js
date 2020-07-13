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
router.route('/')
  .get(allThoughts)
  .post(addThoughts)

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(GetOneThought)
  // .put(addReactions)
  .delete(removeThoughts)
  
// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReactions)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;