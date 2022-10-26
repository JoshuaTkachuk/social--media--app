import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Navigate, useParams } from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import Avatar from 'react-avatar';
import {FcLike, FcLikePlaceholder} from "react-icons/fc"
import {BiMailSend} from "react-icons/bi"


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
                console.log(result.data.numLikes)
                setLikeNum(result.data.numLikes)
                axios.get(`http://localhost:8000/api/findUserUserName/${result.data.createdBy.userName}`,{withCredentials: true})
                    .then((result)=>{
                        setPostUser(result.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
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
                console.log(err.response.data.error)
                setError(err.response.data.error)
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
    return<div className="d-flex justify-content-center" style={{marginRight:140}}>
        <Navbar/>
        <div className="mt-2 d-flex flex-column align-items-center" style={{width:800}}>
            <div className="d-flex flex-column align-items-start p-3 mt-5 border border-solid border-3" style={{width:550, borderRadius:"20px"}}>
                <div style={{width:"500px", borderRadius:"20px"}} className="d-flex flex-column  align-items-top align-self-center p-3 pb-0">
                    {
                        postUser.userName === loggedUser.userName?
                        <div style={{fontSize:"13px"}} className="d-flex">
                            <Link to={`/myProfile`}><Avatar color={"rgb(126, 55, 148)"} size="50" round={true} name={`${loggedUser.firstName} ${loggedUser.lastName}`} /></Link>
                            <Link to={`/myProfile`} className="pt-3 ps-2 text-primary text-decoration-none">@{postUser.userName}</Link>
                        </div>
                            :
                        <div style={{fontSize:"13px"}} className="d-flex">
                            <Link to={`/user/${postUser.userName}`}><Avatar color={"rgb(126, 55, 148)"} size="50" round={true} name={`${postUser.firstName} ${postUser.lastName}`} /></Link>
                            <Link to={`/user/${postUser.userName}`} className="pt-3 ps-2 text-primary text-decoration-none">@{postUser.userName}</Link>
                        </div>
                    }
                    <div style={{fontSize:"30px"}} className="d-flex align-self-start text-break text-white ps-2">{post.content}</div>
                </div>
                <div style={{width: "500px"}} className="d-flex align-items-center justify-content-end ">
                    <div className="text-primary">{likeNum} likes</div>
                    {
                        likeStatus === false?
                            <FcLikePlaceholder size={35} onClick={likePost} className="ms-3">like post</FcLikePlaceholder>
                            :
                            <FcLike size={35} onClick={unlikePost} className="ms-3">unlike Post</FcLike>
                    }
                </div>
            </div>
            <div className="d-flex flex-column border border-3 mt-5 p-3" style={{width:550, borderRadius: "20px"}}>
                {
                    error?
                    <p style={{margin:0}} className="text-danger ps-2" >{error}</p>
                    :<></>
                }
                <form onSubmit={submithandler} className=" mt-4 d-flex justify-content-between">
                        <input type={"text"} onChange={(e)=>setNewComment(e.target.value)} value={newComment} placeholder="Add Comment" style={{resize:"none", width:"410px", height:"55px",borderRadius:"20px"}} className="ps-3"/>
                        <button type="submit" style={{border:"none", backgroundColor:"white", paddingRight:"8px" , borderRadius:"20px"}}><BiMailSend size={40}/></button>
                </form>
                <div className="d-flex flex-column align-self-start pt-3 overflow-auto" style={{maxHeight: 300}}>
                    {
                        comments.map((item,indx)=>{
                            return<div key={indx} className="d-flex align-items-center mb-2">
                                {
                                    item.createdBy.userName === loggedUser.userName?
                                    <div style={{fontSize:"13px"}} className="d-flex">
                                        <Link to={`/myProfile`}><Avatar color={"rgb(126, 55, 148)"} size="50" round={true} name={`${loggedUser.firstName} ${loggedUser.lastName}`}/></Link>
                                        <Link to={`/myProfile`} className="pt-3 ps-2 text-primary text-decoration-none">@{item.createdBy.userName}</Link>
                                        <div className="pt-3 ps-2 text-light">{item.content}</div>
                                    </div>
                                        :
                                    <div style={{fontSize:"13px"}} className="d-flex">
                                        <Link to={`/user/${item.createdBy.userName}`}><Avatar color={"rgb(126, 55, 148)"} size="50" round={true} name={`${item.createdBy.firstName} ${item.createdBy.lastName}`}/></Link>
                                        <Link to={`/user/${item.createdBy.userName}`} className="pt-3 ps-2 text-decoration-none text-primary">@{item.createdBy.userName}</Link>
                                        <div className="pt-3 ps-2 text-light">{item.content}</div>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}
export default Post