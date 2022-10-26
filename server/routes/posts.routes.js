const { authenticate } = require("../config/jwt.config");
const postController = require("../controllers/post.controller");

module.exports = app =>{
    app.post("/api/post", authenticate, postController.createPost);
    app.get("/api/allPosts", postController.findAllPosts);
    app.get("/api/postsByUser/:userName", authenticate, postController.findAllByUser);
    app.get("/api/post/:postId", authenticate, postController.postById);
    app.put("/api/updateLikeNum", authenticate, postController.likePost);
    app.put("/api/updateUnlikeNum", authenticate, postController.unlikePost)
    app.delete("/api/delete/:postId", authenticate, postController.deleteById);
    app.delete("/api/deleteAllPosts", authenticate, postController.deleteAllPosts);
}