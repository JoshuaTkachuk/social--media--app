const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content:{
        type: String,
        required:[true, "Please enter something"],
        minLength: [10, "comment must be at least ten characters"],
        maxLength: [300, "comment must be less than 300 characters"]
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
},{timestamps:true});
module.exports = mongoose.model("Comment", CommentSchema);