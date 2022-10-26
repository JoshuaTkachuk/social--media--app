const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true, "Please enter something"],
        maxlength:[300, "length cannot be greater than 300 characters"]
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    numLikes:{
        type: Number,
        default: 0
    }
},{timestamps:true});
module.exports = mongoose.model("Post", PostSchema);