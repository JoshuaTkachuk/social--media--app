import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Navigate, useParams } from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import Avatar from 'react-avatar';
import {FcLike, FcLikePlaceholder} from "react-icons/fc"
import {BiMailSend} from "react-icons/bi"
import "../styles/post.css"


const Post=()=>{
    const {postId} = useParams();
    const [postUser, setPostUser] = useState({});
    const [loggedUser , setLoggedUser] = useState({});
    const [comments,setComments] = useState([]);
    const [post, setPost] = useState({});
    const [newComment, setNewComment] = useState("");
    const [likeStatus, setlikeStatus] = useState(null);
    const [likeNum, setLikeNum] = useState(0);
    const [error , setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/post/${postId}`, {withCredentials: true})
            .then((result)=>{
                setPost(result.data)
                setPostUser(result.data.createdBy)
                console.log(result.data)
                setLikeNum(result.data.numLikes)
                axios.get(`http://localhost:8000/api/commentsByPost/${postId}`, {withCredentials: true})
                    .then((result)=>{
                        console.log(result.data)
                        setComments(result.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
            .then((result)=>{
                setLoggedUser(result.data)
                if(result.data.likedPosts.includes(`${postId}`)){
                    setlikeStatus(true)
                }
                else{
                    setlikeStatus(false)
                }
            })
            .catch((err)=>{
                console.log(err)
                navigate('/')
            })
    },[])

    const submithandler=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/comment`, {content: newComment, postId: postId}, {withCredentials: true})
            .then((result)=>{
                setComments([...comments, result.data])
                setNewComment("")
                console.log(result)
            })
            .catch((err)=>{
                console.log(err.response.data.errors.content.message)
                setError(err.response.data.errors.content.message)
            })
    }
    const likePost=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/likePost`,{id: postId} ,{withCredentials:true})
        .then((result)=>{
            axios.put("http://localhost:8000/api/updateLikeNum", {id: postId , numLikes: likeNum + 1},{withCredentials:true})
                .then((result2)=>{
                    console.log(result2)
                    setLikeNum(likeNum + 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            setlikeStatus(true)
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    const unlikePost=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/unlikePost`,{id: postId}, {withCredentials:true})
        .then((result)=>{
            axios.put("http://localhost:8000/api/updateUnlikeNum", {id: postId, numLikes: likeNum - 1}, {withCredentials:true})
                .then((result2)=>{
                    console.log(result2)
                    setLikeNum(likeNum - 1)
                })
                .catch((err)=>{
                    console.log(err)
                })
            setlikeStatus(false)
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    return<div >
        <Navbar/>
        <div className="post-feed-wrapper">
            <div className="wrapper">
                <div className="post-wrapper" style={{marginTop: "80px"}}>
                    <div className="post">
                        <Link className="avatar-icn" to={postUser.userName === loggedUser.userName? `/myProfile` : `/user/${postUser.userName}` }><Avatar color={"rgb(126, 55, 148)"} round={true} name={`${postUser.firstName} ${postUser.lastName}`} /></Link>
                        <div className="post-inside">
                            <div className="user-name">
                                <div style={{marginRight: 5}}>{postUser.firstName} {postUser.lastName}</div>
                                <Link className="handle" to={postUser.userName === loggedUser.userName? `/myProfile` : `/user/${postUser.userName}` }>@{postUser.userName}</Link>
                            </div>
                            <div className="content">{post.content}</div>
                            <div className="like-wrapper">
                                {
                                likeStatus === false?
                                    <FcLikePlaceholder  size={35} onClick={likePost}>like post</FcLikePlaceholder>
                                    :
                                    <FcLike  size={35} onClick={unlikePost}>unlike Post</FcLike>
                                }
                                <p style={{margin: 0, marginLeft: "10px"}}>{likeNum} Likes</p>
                            </div>
                        </div>
                    </div>
                    <div >
                    </div>
                </div>
                <div  className= 'comment-form-wrapper' >
                    <div>
                        <form className="comment-form" onSubmit={submithandler} >
                                <textarea className="comment-area"  onChange={(e)=>setNewComment(e.target.value)} value={newComment} placeholder="Add Comment..." />
                                <button className="comment-submit-button" type="submit">Comment</button>
                        </form>
                        {
                            error?
                            <p style={{color: "red", textAlign: "center"}}>{error}</p>
                            :<></>
                        }
                    </div>
                    <div className="post-feed" style={{backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: "25px"}}>
                        {
                            comments.map((item,indx)=>{
                                return<div key={indx} className="container">
                                    <div className="post-wrapper comment" style={{backgroundColor: "transparent"}} >
                                        <div className="post">
                                            <Link className="avatar-icn" to={item.createdBy._id === loggedUser._id ? `/myProfile` : `/user/${item.createdBy.userName}`}><Avatar color={"rgb(126, 55, 148)"} round={true} name={`${item.createdBy.firstName} ${item.createdBy.lastName}`} /></Link>
                                            <div className="post-inside">
                                                <div className="user-name">
                                                    <div style={{marginRight: 5}}>{item.createdBy.firstName} {item.createdBy.lastName}</div>
                                                    <Link className="handle" to={item.createdBy._id === loggedUser._id ? `/myProfile` : `/user/${item.createdBy.userName}`}>@{item.createdBy.userName}</Link>
                                                </div>
                                                <div className="content">{item.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Post