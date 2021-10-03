const router = require("express").Router();
const { getAllThoughts, getThoughById, createThought, updateThought, deleteThought, createReaction, deleteReaction  } = require("../../controllers/thought-controller");

// /api/thoughts
router
.route("/")
.get(getAllThoughts)
// .post(createThought)

router
    .route("/:userId")
    .post(createThought)
// Get, PUT, DELETE at /api/thoughts/:id
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
    .route("/:thoughtId/:reactions")
    .post(createReaction)
    .delete(deleteReaction)


module.exports = router