const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    author: String,
    content: String,
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// quando um fonte importar Tweet.js vai receber o que for passado depois de module.exports.
module.exports = mongoose.model('Tweet', TweetSchema);