import axios from "axios"
import React,{useState, useEffect}from "react"
import {Link, useNavigate} from "react-router-dom";
import Avatar from 'react-avatar';
import Navbar from "./Navbar";

const LikedPosts =()=>{
    const [posts,setPosts] = useState([])
    const [loggedUser,setLoggedUser]= useState({})
    const navigate = useNavigate();

    async function findPosts(postArray){
        let results = []
        for (const item of postArray){
            const response = await axios.get(`http://localhost:8000/api/post/${item}`, {withCredentials: true});
            if(response.data !== null){
                results.push(response.data)
            }
        }
        setPosts(results);
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/", {withCredentials: true})
            .then((result)=>{
                setLoggedUser(result.data);
                findPosts(result.data.likedPosts);
            })
            .catch(err=>{
                console.log(err)
                navigate(`/`);
            })
    },[])
    console.log(posts);
    
    return<div>
        <Navbar/>
        <div className="profile">
            <div className="myProfile-wrapper">
                <h1 className="profile-name" style={{textAlign: "center"}}>Liked Posts</h1>
                    {
                        posts.length > 0 ?
                        posts.map((item,idx)=>{
                            return<div key={idx} className="container">
                                    <Link to={`/post/${item._id}`} className="post-wrapper">
                                        <div className="post">
                                        <Link to={item.createdBy.userName === loggedUser.userName? `/myProfile` : `/user/${item.createdBy.userName}` }><Avatar color={"rgb(126, 55, 148)"} round={true} name={`${item.createdBy.firstName} ${item.createdBy.lastName}`}/></Link>
                                            <div className="post-inside">
                                                <div className="user-name">
                                                    <div style={{marginRight: 5}}>{item.createdBy.firstName} {item.createdBy.lastName}</div>
                                                    <Link to={item.createdBy.userName === loggedUser.userName? `/myProfile` : `/user/${item.createdBy.userName}` } className="handle">@{item.createdBy.userName}</Link>
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
    </div>
}
export default LikedPosts