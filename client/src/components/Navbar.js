import React, {useEffect, useState} from "react"
import {ImSearch} from 'react-icons/im'
import {BiPlus, BiLogOut} from  'react-icons/bi'
import {Link , useNavigate} from "react-router-dom";
import {FaHome} from 'react-icons/fa'
import axios from "axios";
import Avatar from 'react-avatar';
import {IoLogOutOutline} from 'react-icons/io'
import "../styles/Navbar.css"

const Navbar=(props)=>{
    const [loggedUser, setLoggedUser] = useState({});
    const navigate = useNavigate();
    const location = props.location;

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                setLoggedUser(result.data)
            })
            .catch((err)=>{
                console.log(err)
                navigate('/')
            })
    },[])

    const logout=()=>{
        axios.post("http://localhost:8000/api/logout",{}, {withCredentials: true})
        .then(result=>{
            console.log(result)
            navigate("/")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
    <div className="navbar-wrapper">
        <Link className={location == "home"? "navbar-item-active" : "navbar-item"} to={`/home`}><FaHome size={40} color={"black"} className="icon"/> Home</Link>
        <Link className={location == "post"? "navbar-item-active" : "navbar-item"} to={`/newPost`}><BiPlus size={40} color={"black"} className="icon"/>Post</Link>
        <Link className={location == "search"? "navbar-item-active" : "navbar-item"} to={`/search`}><ImSearch size={30} color={"black"} className="icon"/>Search</Link>
        <Link className={location == "profile"? "navbar-item-active" : "navbar-item"} to={`/myProfile`}><Avatar color={"rgb(126, 55, 148)"} size="50" round={true} name={`${loggedUser.firstName} ${loggedUser.lastName}`} className="icon"/> Profile</Link>
        <Link className="navbar-item" to={``} onClick={logout}><BiLogOut size={40} color={"black"} className="icon"/>Logout</Link>
    </div>
)
}
export default Navbar;