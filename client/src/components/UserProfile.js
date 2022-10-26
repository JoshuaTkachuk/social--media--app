import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Avatar from 'react-avatar';


const UserProfile=()=>{
    const {userName} = useParams();
    const [posts,setPosts] = useState([]);
    const [followStatus, setFollowStatus] = useState(null);
    const [user, setUser] = useState({});
    const [loggedUser, setLoggedUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [followingNum, setFollowingNum] = useState(0);
    const [followersNum, setFollowersNum] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/findUserUserName/${userName}`,{withCredentials: true})
            .then((result)=>{
                setUser(result.data);
                console.log(result.data);
                setFollowingNum(result.data.following.length);
                setFollowersNum(result.data.followers.length);
                axios.get(`http://localhost:8000/api/postsByUser/${userName}`,{withCredentials: true})
                    .then((posts)=>{
                        console.log(posts.data)
                        setPosts(posts.data);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/`,{withCredentials: true})
        .then(result=>{
            console.log(result.data)
            setLoggedUser(result.data)
            setFollowing(result.data.following)
            if(result.data.following.includes(`${userName}`)){
                setFollowStatus(true)
            }
            else{
                setFollowStatus(false)
            }
        })
        .catch((err)=>{
            console.log(err)
            navigate('/');
        })
    },[])

    const followUser =(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/follow/${userName}`,{}, {withCredentials: true})
            .then(result=>{
                console.log(result)
                setFollowStatus(true)
                setFollowersNum(followersNum + 1)
                setFollowing(result.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    
    const unfollowUser =(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/unfollow/${userName}`,{}, {withCredentials: true})
            .then((result)=>{
                console.log(result)
                setFollowStatus(false)
                setFollowersNum(followersNum - 1)
                setFollowing(result.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    return<div className="profile-wrapper">
        <Navbar/>
        <div className="profile">
            <div className="sticky-username">
                <div className="name-following">
                    <h1 className="profile-name">{userName}</h1>
                    <div className="following-container">
                        <Link to={`/followers/${userName}`} className="followers-following">{followersNum} followers</Link>
                        <Link to={`/following/${userName}`} className="followers-following">{followingNum} following</Link>
                    </div>
                </div>
                <button className="follow-btn" onClick={followStatus === true ? unfollowUser : followUser}>{followStatus === true ? "unfollow" : "follow"}</button>
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
                                        </div>
                                    </div>
                                </div>
                            </Link>
                    </div>
                })
                :<p style={{color: "white", marginTop: "25vh"}}>No Posts</p>
            }
        </div>
    </div>
}
export default UserProfile;