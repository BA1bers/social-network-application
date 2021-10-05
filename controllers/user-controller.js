const { Thought, User } = require('../models')

module.exports = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no user found with this id!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.json(err))
    },
    addUser(req, res) {
        User.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(400).json(err));
    },

    removeUser(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then((responses) => {
                res.json(responses)
            })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There was no friend found with this id' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'There was no friend found with this id' })
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.id } },
            { new: true }
        ).then((data) => {
            if (!data) {
                res.status(404).json({ message: "There was no friend found with this id" });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { new: true }
            )
                .then((data) => {
                    if (!data) {
                        res.status(404).json({ message: "No friend with this id" });
                    }
                    res.json(data);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    },
};

module.exports = userController;