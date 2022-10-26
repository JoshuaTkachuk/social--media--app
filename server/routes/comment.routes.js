const { authenticate } = require("../config/jwt.config");
const commentController = require("../controllers/comment.controller");

module.exports = app =>{
    app.post("/api/comment", authenticate, commentController.createComment);
    app.get("/api/comment",authenticate, commentController.findAllComments);
    app.get("/api/commentsByPost/:postId", authenticate, commentController.findCommentsByPost);
}