import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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

    return <div className="d-flex flex-column align-items-center  mt-5">
        <h1 className="text-white">Login</h1>
        <form className="d-flex flex-column align-items-center p-4 bg-primary  border border-3" style={{borderRadius: 25}} onSubmit={handleSubmit}>
            {
                errors?<p>{errors}</p>:<></>
            }
            <label>Email:</label>
            <input type={"text"} onChange={(e)=> setEmail(e.target.value)} style={{borderRadius: 10}}></input>
            <label>Password:</label>
            <input type={"text"} onChange={(e)=> setPassword(e.target.value)} style={{borderRadius: 10}}></input>
            <input className="mt-2 border border-light border-2 bg-light text-dark" style={{borderRadius: 10}} type={"submit"}></input>
        </form>
    </div>
}
export default Login;