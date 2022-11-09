import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Avatar from 'react-avatar';
import "../styles/MyProfile.css"

const MyProfile =()=>{
    const [posts,setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/`,{withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                setUser(result.data)
                setFollowing(result.data.following.length)
                setFollowers(result.data.followers.length)
                axios.get(`http://localhost:8000/api/postsByUser/${result.data.userName}`,{withCredentials: true})
                    .then((result)=>{
                        console.log(result.data)
                        setPosts(result.data);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
                navigate('/')
            })
    },[])

    const deletePost=(id)=>{
        axios.delete(`http://localhost:8000/api/delete/${id}`, {withCredentials: true})
            .then((result)=>{
                setPosts(posts.filter(post=> post._id !== id));
            })
            .catch((err)=>{
                console.log(err);
            })
    }

return<div className="profile-wrapper">
    <Navbar location={"profile"}/>
        <div className="profile">
            <div className="myProfile-wrapper">
            <div className="top-username">
                <div className="name-following">
                    <h1 className="profile-name">{user.userName}</h1>
                    <div className="following-container">
                        <Link className="followers-following" to={`/followers/${user.userName}`}>{followers} followers</Link>
                        <Link className="followers-following" to={`/following/${user.userName}`}>{following} following</Link>
                    </div>
                </div>
                <div className="both-btns">
                    <button className="update-name-btn" onClick={(e)=>{navigate(`/updateName`)}}>update Name</button>
                    <button className="liked-posts-btn" onClick={(e)=>navigate(`/likedPosts`)}>liked posts</button>
                </div>
            </div>
                {
                    posts.length > 0 ?
                    posts.map((item,idx)=>{
                        return<div key={idx} className="container">
                                <Link to={`/post/${item._id}`} className="post-wrapper">
                                    <div className="post">
                                    <Link className="" to={`/myProfile`}><Avatar color={"rgb(126, 55, 148)"} round={true} name={`${item.createdBy.firstName} ${item.createdBy.lastName}`}/></Link>
                                        <div className="post-inside">
                                            <div className="user-name">
                                                <div style={{marginRight: 5}}>{item.createdBy.firstName} {item.createdBy.lastName}</div>
                                                <Link to={`/myProfile`} className="handle">@{item.createdBy.userName}</Link>
                                            </div>
                                            <div className="content">{item.content}</div>
                                            <div className="like-delete">
                                                <p className="likes">{item.numLikes} likes</p>
                                                <Link to="/myprofile" className="delete" onClick={(e)=> deletePost(item._id) }>delete</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                        </div>
                    })
                    :<p style={{marginTop: "25vh", textAlign: "center", color:"white"}}>No Posts</p>
                }
            </div>
        </div>

</div>
}
export default MyProfile;