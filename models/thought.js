const { Schema, model } = require('mongoose')
const moment = require('moment')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Needs to be longer than 1 character'],
        maxlength: [280, 'Needs to be less than 280 characters']
    },
    //Bryce showed me how to do a 'created at' value for adding dates
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: { type: String, required: true },
    reactions: [reactionSchema]
},
    {
        toJSON: { virtuals: true, getters: true }
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought