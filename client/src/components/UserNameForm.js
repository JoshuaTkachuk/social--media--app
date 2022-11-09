import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/UpdateForm.css'

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
    return<div>
        <Navbar/>
        <div className='wrapper'>
            <h1 className='title'>update username</h1>
            <form className='username-form'  onSubmit={handleSubmit}>
                <input className='update-name-input' onChange={(e)=>setNewName(e.target.value)} value={newName} placeholder={name}/>
                <button  className='submit-name' type='submit'>submit</button>
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