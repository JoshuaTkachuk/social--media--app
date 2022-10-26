import { BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import PostForm from "./components/PostForm";
import Search from "./components/Search";
import MyProfile from "./components/MyProfile";
import UserNameForm from "./components/UserNameForm";
import LikedPosts from "./components/LikedPosts";
import Followers from "./components/Followers";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<Login/>} default path="/"/>
        <Route element={<Home/>} path="/home"/>
        <Route element={<Register/>} path="/register"/>
        <Route element={<UserProfile/>} path="/user/:userName"/>
        <Route element={<MyProfile/>} path="/myProfile"/>
        <Route element={<Post/>} path="/post/:postId"/>
        <Route element={<PostForm/>} path="/newPost"/>
        <Route element={<Search/>} path="/search"/>
        <Route element={<UserNameForm/>} path="/updateName"/>
        <Route element={<LikedPosts/>} path="/likedPosts"/>
        <Route element={<Followers/>} path="/:follow/:userName"/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
