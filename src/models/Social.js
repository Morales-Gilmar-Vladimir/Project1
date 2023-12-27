const { Schema, model } = require('mongoose')

const socialSchema = new Schema(
    {

        image: {
            public_id: String,
            secure_url: String
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        facebook: {
            type: String,
            required: false
        },
        linkedin: {
            type: String,
            required: false
        },
        github: {
            type: String,
            required: false
        },
        instagram: {
            type: String,
            required: false
        },
        tiktok: {
            type: String,
            required: false
        },
        twiter: {
            type: String,
            required: false
        },
        user: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('social', socialSchema)