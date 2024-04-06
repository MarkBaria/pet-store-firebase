import React, { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (event) =>{
        event.preventDefault();
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth,email,password)
        .then(res=>{
            console.log(res.user)
            navigate('/login')
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <h1>Sign up</h1>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='email'/><br/>
            <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='password'/><br/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Signup