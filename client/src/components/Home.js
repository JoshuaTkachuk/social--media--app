import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Avatar from 'react-avatar';
import Navbar from "./Navbar";
import "../styles/Home.css"
const Home=()=>{

    const [posts,setPosts] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
        .then((user)=>{
            console.log(user.data)
            setLoggedUser(user.data)
            axios.get("http://localhost:8000/api/allPosts", {withCredentials: true})
                .then((result)=>{
                    console.log(result.data)
                    setPosts(result.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
        })
        .catch((err)=>{
            console.log(err)
            navigate(`/`);
        })
    },[])
    return(
        <div className="home-wrapper">
            <Navbar location={"home"}/>
            <div className="post-feed-wrapper">
                <div className="post-feed">
                {
                    posts.length > 0 ?
                        posts.map((item,idx)=>{
                            return<div key={idx} className="container">
                                    <Link className="post-wrapper" to={`/post/${item._id}`}>
                                        <div className="post">
                                                    <Link className="avatar-icn" to={item.createdBy._id === loggedUser._id ? `/myProfile` : `/user/${item.createdBy.userName}`}><Avatar color={"rgb(126, 55, 148)"} round={true} name={`${item.createdBy.firstName} ${item.createdBy.lastName}`} /></Link>
                                                    <div className="post-inside">
                                                        <div className="user-name">
                                                            <div style={{marginRight: 5}}>{item.createdBy.firstName} {item.createdBy.lastName}</div>
                                                            <Link className="handle" to={item.createdBy._id === loggedUser._id ? `/myProfile` : `/user/${item.createdBy.userName}`}>@{item.createdBy.userName}</Link>
                                                        </div>
                                                        <div className="content">{item.content}</div>
                                                        <p className="likes">{item.numLikes} Likes</p>
                                                    </div>
                                        </div>
                                    </Link>
                            </div>
                        })
                    :
                    <p>no posts</p>
                }
                </div>
            </div>
        </div>
    );
}
export default Home