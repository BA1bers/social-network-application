const {User} = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
        .then ((responses)=> {
            res.json(responses)
        })
    },
    createUser(req, res) {
        User.create(req.body)
        .then ((responses) => {
            res.json(responses)
        })
    },
    getUserById(req, res) {
        User.findById(req.params.id)
        .populate('thoughts').populate('friends')
        .then ((responses) => {
            res.json(responses)
        })
    },
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
        .then ((responses)=> {
            res.json(responses)
        })
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body)
        .then ((responses) => {
            res.json(responses)
        })
    }
}