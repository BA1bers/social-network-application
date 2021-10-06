const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById, 
    addThought, 
    updateThought,
    removeThought,
    } = require('../../controllers/thought-controller')

const {
    addReaction,
    removeReaction
} = require ('../../controllers/reaction-controller')

router.route('/').get(getAllThoughts).post(addThought) 

router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought)

router.route("/:thoughtId/:reactions").post(addReaction).delete(removeReaction)

module.exports = router;