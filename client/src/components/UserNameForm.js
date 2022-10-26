import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

const UserNameForm=()=>{
    const [name,setName] = useState('')
    const [newName, setNewName] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                setName(result.data.userName)
            })
            .catch((err)=>{
                console.log(err)
                navigate('/')
            })
    },[])


    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/${name}`, {newuserName: newName}, {withCredentials: true})
        .then(result=>{
            console.log(result)
            navigate('/myProfile')
        })
        .catch(err=>{
            setError(err.response.data.errors.userName.message)
        })
    }
    return<div className="d-flex justify-content-center">
        <Navbar/>
        <div className='d-flex flex-column align-items-center' style={{width: "800px", marginRight: 140}}>
            <h1 style={{width: 700}} className='text-white border-bottom mt-2 border-3 text-center p-2'>update username</h1>
            <form className='d-flex flex-column align-items-center border border-3 p-3 mt-5 bg-primary ' style={{borderRadius: 25}} onSubmit={handleSubmit}>
                <input style={{borderRadius: 25}} onChange={(e)=>setNewName(e.target.value)} value={newName} placeholder={name}/>
                <button style={{borderRadius: 25}} className='mt-2' type='submit'>submit</button>
            </form>
            {
                error ?
                <p>{error}</p>
                : <></>
            }
        </div>
    </div>
}
export default UserNameForm;