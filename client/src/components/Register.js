import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [userName,setUserName] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [errors,setErrors] = useState({})
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

    return<div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-white">Register</h1>
        <form className=" bg-primary d-flex flex-column align-items-center justify-content-center border border-3 p-3" style={{width:400, height:"100%", borderRadius: 25}} onSubmit={handleSubmit}>
        <label className="text-black">Email:</label>
            {
                errors.email?
                <p className="text-danger">{errors.email.message}</p>:
                <></>
            }
            <input style={{borderRadius: 10}} type={"text"} onChange={(e)=> setEmail(e.target.value)}></input>
        <label className="text-black">First Name:</label>
            {
                errors.firstName?
                <p className="text-danger">{errors.firstName.message}</p>:
                <></>
            }
            <input style={{borderRadius: 10}} type={"text"} onChange={(e)=> setFirstName(e.target.value)}></input>
            <label className="text-black">Last Name:</label>
            {
                errors.lastName?
                <p className="text-danger">{errors.lastName.message}</p>:
                <></>
            }
            <input style={{borderRadius: 10}} type={"text"} onChange={(e)=> setLastName(e.target.value)}></input>
            <label className="text-black">user name:</label>
            {
                errors.userName?
                <p className="text-danger">{errors.userName.message}</p>:
                <></>
            }
            <input style={{borderRadius: 10}} type={"text"} onChange={(e)=> setUserName(e.target.value)}></input>
            <label className="text-black">Password:</label>
            {
                errors.password?
                <p className="text-danger">{errors.password.message}</p>:
                <></>
            }
            <input style={{borderRadius: 10}} type={"text"} onChange={(e)=> setPassword(e.target.value)}></input>
            <label className="text-black">confirm password:</label>
            {
                errors.confirmPassword?
                <p className="text-danger">{errors.confirmPassword.message}</p>:
                <></>
            }
            <input style={{borderRadius: 10}} type={"text"} onChange={(e)=> setConfirmPassword(e.target.value)}></input>
            <input className="mt-2 border border-light border-2 bg-light text-dark" style={{borderRadius: 10}} type={"submit"}></input>
        </form>
    </div>
}
export default Register;