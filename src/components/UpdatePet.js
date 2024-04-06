import React, { useState } from 'react'
import '../components/style.css'
import {getDatabase,ref, update} from 'firebase/database'
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { useNavigate, useLocation } from 'react-router-dom'

const UpadtePet = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [petname, setPetname] = useState(location.state[1].name)
  const [price, setPrice] = useState(location.state[1].petprice)
  const [petid, setPetid] = useState(location.state[0])
  const [selectedFile, setSelectedFile] =  useState(null)

  const handleFileChange = (event) =>{
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  console.log(location)

  const submitHandler = async (event) =>{
    event.preventDefault();
    if(selectedFile)
    {
    const db = getDatabase(app)
    const storage = getStorage(app)
    
    const myRef = storageRef(storage,`images/${location.state[0]}`)
    await uploadBytes(myRef,selectedFile)
    const imageUrl = await getDownloadURL(myRef)

    const petRef = ref(db,'pet/'+location.state[0])
    update(petRef,{name:petname, petprice:price, imageUrl:imageUrl})
    .then(res=>{
        navigate('/petslist')
    })
    .catch(err=>{
        console.log(err)
    })
    }
    else{
        const db = getDatabase(app)
    
    

    const petRef = ref(db,'pet/'+location.state[0])
    update(petRef,{name:petname, petprice:price})
    .then(res=>{
        navigate('/petslist')
    })
    .catch(err=>{
        console.log(err)
    })
    }
  }
  return (
    <div id='add-pets'>
        <form onSubmit={submitHandler}>
          <h1>Add Pet</h1>
          <table>
          <tr>
              <td><label>Pet Id:</label></td>
              <td><input disabled value={petid} onChange={(e)=>setPetid(e.target.value)} type='text' placeholder='Pet id'/></td>
            </tr>
            <tr>
              <td><label>Pet Type:</label></td>
              <td><input value={petname} onChange={(e)=>setPetname(e.target.value)} type='text' placeholder='e.g. Dog'/></td>
            </tr>
            <tr>
              <td><label>Price:</label></td>
              <td><input value={price} onChange={(e)=>setPrice(e.target.value)} type='number' placeholder='e.g. 2000'/></td> 
            </tr>
            <tr>
              <td><label>Image:</label></td>
              <td><input onChange={handleFileChange} type='file' /></td> 
            </tr>
          </table>
          <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default UpadtePet