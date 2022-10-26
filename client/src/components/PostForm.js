import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {BiMailSend} from "react-icons/bi"
import "../styles/PostForm.css"

const PostForm=()=>{
    const [content,setContent] = useState("");
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState();
    const [error ,setError] = useState();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/", {withCredentials: true})
            .then((result)=>{
                setLoggedUser(result.data);
            })
            .catch(err=>{
                console.log(err)
                navigate(`/`);
            })
    },[])

    const submithandler= (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/post", {content}, {withCredentials: true})
            .then((result)=>{
                console.log(result)
                navigate('/home');
            })
            .catch((err)=>{
                setError(err.response.data.errors.content.message)
                console.log(err.response.data.errors.content.message)
            })
    }
    return<div className="post-form-wrapper">
        <Navbar location={"post"}/>
        <form onSubmit={submithandler} className="post-form">
            <h1>New Post</h1>
            <div className="form-inputs">
                <textarea className="text-area" placeholder="what's on your mind?" onChange={(e)=>setContent(e.target.value)}/>
                <button type="submit" className="submit-button">Post</button>
            </div>
            {
                error?
                <div className="text-danger">{error}</div>
                :
                <></>
            }
        </form>
    </div>
}
export default PostForm;