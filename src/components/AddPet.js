import React, { useState } from 'react'
import '../components/style.css'
import {getDatabase,ref,set} from 'firebase/database'
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom'

const AddPet = () => {
  const [petname, setPetname] = useState('')
  const [price, setPrice] = useState(null)
  const [petid, setPetid] = useState(null)
  const [selectedFile, setSelectedFile] =  useState(null)
  const navigate = useNavigate()

  const handleFileChange = (event) =>{
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const submitHandler = async (event) =>{
    const db = getDatabase(app)
    event.preventDefault();
    const storage = getStorage(app)

    const myRef = storageRef(storage,`images/${petid}`)
    await uploadBytes(myRef,selectedFile)

    const imageUrl = await getDownloadURL(myRef)

    set(ref(db,'pet/'+petid),{
      name:petname,
      petprice:price,
      imageUrl:imageUrl
    })
    .then(res=>{
      navigate('/dashboard/petslist')
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div id='add-pets'>
        <form onSubmit={submitHandler}>
          <h1>Add Pet</h1>
          <table>
          <tr>
              <td><label>Pet Id:</label></td>
              <td><input onChange={(e)=>setPetid(e.target.value)} type='text' placeholder='Pet id'/></td>
            </tr>
            <tr>
              <td><label>Pet Type:</label></td>
              <td><input onChange={(e)=>setPetname(e.target.value)} type='text' placeholder='e.g. Dog'/></td>
            </tr>
            <tr>
              <td><label>Price:</label></td>
              <td><input onChange={(e)=>setPrice(e.target.value)} type='number' placeholder='e.g. 2000'/></td> 
            </tr>
            <tr>
              <td><label>Image:</label></td>
              <td><input onChange={handleFileChange} type='file' /></td> 
            </tr>
          </table>
          <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddPet