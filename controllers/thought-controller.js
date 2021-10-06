const { Thought, User, Reaction } = require('../models')

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: "thought", select: "-__v" })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then((data) => {
                console.log(data);
                if (!data) {
                    res.status(404).json({ message: "There are no thoughts found with this id" });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addThought(req, res) {
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
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    });
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ id: params.id }, body, { new: true, runValidators: true })
            .then((responses) => {
                res.json(responses)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ id: params.id })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController;