import React, { useState } from 'react'
import {collection, addDoc, getFirestore} from 'firebase/firestore'
import {app} from '../firebase'



const AddSeller = () => {

const [sellername, setSellerName] = useState('')    
const [phone, setPhone] = useState(null)  

const submitHandler = async (event) =>{
    event.preventDefault();
    console.log(sellername, phone)
    const db = getFirestore(app)
    const docRef = await addDoc(collection(db,'seller'),{
        name:sellername,
        phoneNumber:phone
    })
    console.log(docRef, docRef.id)
}

  return (
    <div>
        <h1>AddSeller</h1>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>setSellerName(e.target.value)} type='text' placeholder='seller name '/><br/>
            <input onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='phone number'/><br/>
            <button type='submit'> Submit </button>
        </form>
    </div>
  )
}

export default AddSeller