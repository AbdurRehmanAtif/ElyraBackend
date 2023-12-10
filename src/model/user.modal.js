const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true,
            lowcase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowcase: true,
            trim: true,
        }, watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        salt: {
            type: String,
            required: [true, "Password is required"]
        },
        hash: {
            type: String,
            required: [true, "Password is required"]
        },
        admin: {
            type: String,
            required: false,
        },
    }, {
    timestamps: true

})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
