import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Avatar from 'react-avatar';
import "../styles/followers.css"

const Followers=()=>{
    const {userName} = useParams();
    const {follow} = useParams();
    const [loggedUser, setLoggedUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
            .then((result)=>{
                setLoggedUser(result.data);
            })
            .catch((err)=>{
                console.log(err);
                navigate(`/`);
            })
    },[])

    useEffect(()=>{
        getFollowersAndFollowing();
    },[])

    function getFollowersAndFollowing(){
        axios.get(`http://localhost:8000/api/findUserUserName/${userName}`,{withCredentials: true})
            .then((result)=>{
                
                getFollowing(result.data.following);
                getFollowers(result.data.followers);
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    async function getFollowers(userNames){
        var followerArray = [];
        for(const user of userNames){
            const result = await axios.get(`http://localhost:8000/api/findUserUserName/${user}`,{withCredentials: true})
            followerArray.push(result.data)
        }
        setFollowers(followerArray)
    }

    async function getFollowing(userNames){
        var followingArray = [];
        for(const user of userNames){
            const result = await axios.get(`http://localhost:8000/api/findUserUserName/${user}`,{withCredentials: true})
            followingArray.push(result.data)
        }
        setFollowing(followingArray)
    }

    return<div className="wrapper">
            <Navbar/>
        {
            follow == "following"?
                <div className="follower-wrapper">
                        {
                        following.length > 0 ?
                        <div>
                            <h1 className="title">Following</h1>
                            {
                                following.map((item,idx)=>{
                                    return<div className="users-wrapper" key={idx}>
                                        {
                                            loggedUser.userName == item?
                                            <Link className="d-flex justify-content-center" to={`/myProfile`}>{item}</Link>
                                            :
                                            <Link to={`/user/${item.userName}`}  className="user" style={{borderRadius: "25px"}}>
                                            <Avatar color={"rgb(126, 55, 148)"} round={true} size="75" name={`${item.firstName} ${item.lastName}`}/>
                                            <div className='user-words'>
                                                <div className='text-light h5 m-0' style={{}}>{item.firstName} {item.lastName}</div>
                                                <div className='handle' >@{item.userName}</div>
                                            </div>
                                        </Link>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    :
                    <div style={{width:800}} className="d-flex flex-column align-items-center">
                        <h1 style={{width:700}}  className="title">Following</h1>
                    </div>
                    }
                </div>
            :
            <div className="follower-wrapper">
                {
                followers.length > 0 ?
                    <div>
                        <h1 className="title">Followers</h1>
                        {
                            followers.map((item,idx)=>{
                                return<div className="users-wrapper" key={idx}>
                                    {
                                        loggedUser.userName == item?
                                        <Link className="d-flex justify-content-center" to={`/myProfile`}>{item}</Link>
                                        :
                                        <Link to={`/user/${item.userName}`} className="user" style={{borderRadius: "25px"}}>
                                        <Avatar color={"rgb(126, 55, 148)"} round={true} size="75" name={`${item.firstName} ${item.lastName}`}/>
                                        <div className='user-words'>
                                            <div className='text-light h5 m-0' style={{}}>{item.firstName} {item.lastName}</div>
                                            <div className='handle'>@{item.userName}</div>
                                        </div>
                                    </Link>
                                    }
                                </div>
                            })
                        }
                    </div>
                :
                <div style={{width:800}} className="d-flex flex-column align-items-center">
                    <h1 style={{width:700}} className="title">Followers</h1>
                </div>
                }
            </div>
            
        }
    </div>
}
export default Followers