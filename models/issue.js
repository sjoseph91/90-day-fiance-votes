const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true, 
    },
    authorName: { //This must be manually added by the program which will read it from the user object
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})


module.exports = mongoose.model("Issue", issueSchema)