const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const dateFormat = require('../utils/dateFormat')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Needs to be longer than 1 character'],
            max: [280, 'Needs to be shorter than 280 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    },
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought