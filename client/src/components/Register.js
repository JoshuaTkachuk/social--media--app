import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/register.css";

const Register=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [userName,setUserName] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [errors,setErrors] = useState([])
    const navigate = useNavigate();
    
    const handleSubmit=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/register",{email,password,confirmPassword,userName,firstName,lastName},{withCredentials: true})
            .then((result)=>{
                console.log(result)
                navigate(`/home`)
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return<div className="login-wrapper">
            <form className="login-form" style={{height:"30vh"}} onSubmit={handleSubmit}>
            <h1 style={{color: "white"}}>Register</h1>
            <div className= "first-last-name">
                    
                    <input className="login-input" placeholder="First Name" type={"text"} onChange={(e)=> setFirstName(e.target.value)}></input>
                    
                    <input className="login-input" placeholder="Last Name" type={"text"} onChange={(e)=> setLastName(e.target.value)}></input>
            </div>
                
                <input  placeholder="Email" className="login-input" type={"email"} onChange={(e)=> setEmail(e.target.value)}></input>
                
                <input placeholder="Username" className="login-input" type={"text"} onChange={(e)=> setUserName(e.target.value)}></input>
                
                <input placeholder="Password" className="login-input" type={"password"} onChange={(e)=> setPassword(e.target.value)}></input>
                
                <input placeholder="Confirm Password" className="login-input" type={"password"} onChange={(e)=> setConfirmPassword(e.target.value)}></input>
                <button className="submit" type={"submit"}>Register</button>
            </form>
            <div className="login-link">
                <div style={{color: "white"}}>Already have an account?</div>
                <a style={{color: "pink"}} href="/">Login</a>
            </div>
            <div className="errors">
                {
                    errors.firstName?<div className="error-message">{errors.firstName.message}</div>:<></>
                }
                {
                    errors.lastName?<div className="error-message">{errors.lastName.message}</div>:<></>
                }
                {
                    errors.userName?<div className="error-message">{errors.userName.message}</div>:<></>
                }
                {
                    errors.email?<div className="error-message">{errors.email.message}</div>:<></>
                }
                {
                    errors.password?<div className="error-message">{errors.password.message}</div>:<></>
                }
                {
                    errors.confirmPassword?<div className="error-message">{errors.confirmPassword.message}</div>:<></>
                }
            </div>
    </div>
}
export default Register;