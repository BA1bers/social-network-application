const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((responses) => {
                res.json(responses)
            })
    },
    getThoughById(req, res) {
        Thought.findById(req.params.id)
            .then((responses) => {
                res.json(responses)
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findById(req.body.userId)
                    .then((user) => {
                        user.thoughts.push(thought._id)
                        User.replaceOne({ _id: user._id }, user)
                            .then(() => {
                                res.json(thought)
                            })
                    })
            })
    },
    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body)
            .then((responses) => {
                res.json(responses)
            })
    },
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
            .then((responses) => {
                res.json(responses)
            })
    }

}
