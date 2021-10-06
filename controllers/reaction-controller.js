const { User, Thought, Reaction } = require('../models');

const reactionController = {

    addReaction({ params, body }, res) {
        console.log(body)
        Reaction.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'There was no reaction found' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ id: params.id })
            .then(reactionData => res.json(reactionData))
            .catch(err => res.json(err))
    }
}

module.exports = reactionController