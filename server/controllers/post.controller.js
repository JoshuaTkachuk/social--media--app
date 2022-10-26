const User = require("../models/user.model")
const Post = require("../models/post.model");

module.exports={
    createPost:(req,res)=>{
        const newPost = new Post(req.body);
        //const decodedJWT = jwt.decode(req.cookies.userToken,{complete:true})
        newPost.createdBy = req.jwtpayload.id;
        newPost.save()
            .then((result =>{
                res.json(result);
            }))
            .catch(err=>{
                console.log("something went wrong creating post")
                res.status(400).json(err)
            })
    },
    findAllPosts:(req,res)=>{
        Post.find()
            .populate("createdBy", "userName  firstName  lastName")
            .then((posts)=>{
                res.json(posts)
            })
            .catch((err)=>{
                res.json({message: "Something went wrong finding all posts", error: err})
            })
    },
    findAllByUser:(req,res)=>{
        //if user is not logged in, find the user, then find the posts
        if(req.jwtpayload.userName !== req.params.userName){
            User.findOne({userName: req.params.userName})
                .then((notLoggedUser)=>{
                    Post.find({createdBy: notLoggedUser._id})
                    .populate("createdBy", "userName  firstName  lastName")
                    .then((posts) =>{
                        res.json(posts)
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json(err)
                })
        }
        //if user is logged in, simply find posts
        else{
            Post.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "userName  firstName  lastName")
                .then((posts)=>{
                    res.json(posts)
                })
                .catch((err)=>console.log(err))
        }
    },
    postById:(req,res)=>{
        Post.findById(req.params.postId)
            .populate("createdBy", "userName  firstName  lastName")
            .then(result=>{
                res.json(result)
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    deleteById:(req,res)=>{
        Post.findByIdAndDelete(req.params.postId)
        .then((result)=>{
            res.json(result)
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    deleteAllPosts:(req,res)=>{
        Post.deleteMany({})
            .then((result)=>{
                res.json(result)
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    likePost:(req,res)=>{
        console.log(req.body)
        Post.findOneAndUpdate({_id: req.body.id}, {numLikes: req.body.numLikes})
        .then((result)=>{
            console.log(result)
            res.json(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    unlikePost:(req,res)=>{
        Post.findOneAndUpdate({_id: req.body.id}, {numLikes: req.body.numLikes})
        .then((result)=>{
            console.log(result)
            res.json(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}