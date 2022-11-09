const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const jwt = require("jsonwebtoken");

module.exports={
    createComment:(req,res)=>{
        const newComment = new Comment(req.body)

        newComment.createdBy = req.jwtpayload.id;
        newComment.populate("createdBy", "userName firstName lastName")
        newComment.save()
            .then((result=>{
                console.log(result)
                res.json(result)
            }))
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err);
            })
    },
    findAllComments:(req,res)=>{
        Comment.find()
        .populate("postId createdBy", "content userName")
        .then((comment)=>{
            console.log(comment)
            res.json(comment)
        })
        .catch((err)=>{
            res.json(err)
        })
    },
    findCommentsByPost:(req,res)=>{
        Comment.find({postId: req.params.postId})
        .populate("createdBy", "userName firstName lastName")
            .then((result)=>{
                res.json(result)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
    }
}