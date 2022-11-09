import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/login.css"

const Login=()=>{
    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors,setErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/login",{email: email, password: password},{withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                navigate(`/home`);
            })
            .catch((err)=>{
                console.log(err)
                setErrors("invalid username or password")
            })
    }
    return <div className="login-wrapper">
    <form className="login-form" onSubmit={handleSubmit}>
        <h1 style={{color: "white"}}>Login</h1>
        <div className="inputs">
            <input className="login-input" type={"text"} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input className="login-input" type={"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="submit" type={"submit"}>Login</button>
        </div>
        
    </form>
    <div className="login-link">
        <div style={{color: "white"}}>Dont have an account?</div>
        <a style={{color: "pink"}} href="/register">Register</a>
    </div>
    <div className="errors">
        {
            errors?<p>{errors}</p>:<></>
        }
    </div>
</div>
}
export default Login;