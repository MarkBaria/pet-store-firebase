import React, { useState } from 'react'
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (event) =>{
        event.preventDefault();
        const auth = getAuth(app)
        signInWithEmailAndPassword(auth,email,password)
        .then(userData=>{
            console.log(userData.user)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    
    }

    const loginwithGoogle =  () =>{
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then((result)=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const loginwithFacebook =  () =>{
        const auth = getAuth(app)
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth,provider)
        .then((result)=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='email'/><br/>
            <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='password'/><br/>
            <button>Login</button><br/>
            <br/>
            <button type='button' onClick={loginwithGoogle}>Login with Google</button><br/>
            <br/>
            <button type='button' onClick={loginwithFacebook}>Login with Facebook</button>
        </form>
       
        
    </div>
  )
}

export default Login