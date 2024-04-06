import React, { useState } from 'react'
import {collection, addDoc, getFirestore, updateDoc, doc} from 'firebase/firestore'
import {app} from '../firebase'
import { useLocation, useNavigate } from 'react-router-dom'



const UpdateSeller = () => {
const location = useLocation()
const navigate = useNavigate()

console.log(location.state)
const [sellername, setSellerName] = useState(location.state.name)    
const [phone, setPhone] = useState(location.state.phoneNumber)  

const submitHandler = async (event) =>{
    event.preventDefault();
    console.log(sellername, phone)
    const db = getFirestore(app)
    const docRef = doc(db, 'seller', location.state.id)
    try{
        await updateDoc(docRef, {name:sellername, phoneNumber:phone })
        navigate('/sellerlist')
        
    }
    catch(err){
        console.log(err)
    }
}

  return (
    <div>
        <h1>AddSeller</h1>
        <form onSubmit={submitHandler}>
            <input value={sellername} onChange={(e)=>setSellerName(e.target.value)} type='text' placeholder='seller name '/><br/>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='phone number'/><br/>
            <button type='submit'> Submit </button>
        </form>
    </div>
  )
}

export default UpdateSeller