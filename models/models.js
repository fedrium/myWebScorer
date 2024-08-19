const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema ({
    projectName: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;