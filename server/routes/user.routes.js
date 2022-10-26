const { authenticate } = require('../config/jwt.config');
const userController = require('../controllers/user.controller');

module.exports = app =>{
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);
    app.get("/api/user",authenticate, userController.getLoggedUser);
    app.get("/api/findUserId/:id", userController.getOneUserById);
    app.get("/api/findUserUserName/:userName",authenticate, userController.getOneUserByUserName);
    app.get("/api/searchByUsername/:userName", userController.searchByUsername);
    app.put("/api/follow/:userName", authenticate, userController.followUser);
    app.put("/api/unfollow/:userName", authenticate, userController.unfollowUser);
    app.put("/api/update/:userName", authenticate, userController.updateUsername);
    app.put("/api/likePost", authenticate, userController.likePost);
    app.put("/api/unlikePost", authenticate, userController.unlikePost);
    app.delete("/api/deleteAllUsers", authenticate, userController.deleteAllUsers);
}