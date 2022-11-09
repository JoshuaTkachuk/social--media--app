import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom"
import Navbar from "./Navbar";
import Avatar from 'react-avatar';
import "../styles/Search.css"

const Search =()=>{
    const [search,setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
            .then((result)=>{
                setLoggedUser(result.data)
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
                navigate(`/`);
            })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/searchByUsername/${search}`, {withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                setUsers(result.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[search])

    return<div className="wrapper">
        <Navbar location={"search"}/>
        <div className='search'>
            <h1 className='title'>Search Users</h1>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input className='search-bar' type={"search"} placeholder={"Search Users"} onChange={(e)=> setSearch(e.target.value)}></input>
            </form>
        </div>
        <div className='users-outer-wrapper'>
            <div className='users-wrapper'>
                {
                    users.length > 0?
                        users.map((item,idx)=>{
                            return<div key={idx}>
                                <Link to={item._id === loggedUser._id ? `/myProfile` : `/user/${item.userName}`} className="user">
                                    <Avatar color={"rgb(126, 55, 148)"} round={true} size="75" name={`${item.firstName} ${item.lastName}`}/>
                                    <div className='user-words'>
                                        <div className='text-light h5 m-0'>{item.firstName} {item.lastName}</div>
                                        <div className='handle'>@{item.userName}</div>
                                    </div>
                                </Link>
                            </div>
                        })
                    :null
                }
            </div>
        </div>
    </div>
}
export default Search