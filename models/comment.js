const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
        
    },
    authorName: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Comment", commentSchema)