const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content:{
        type: String,
        required:[true, "Please enter something"]
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