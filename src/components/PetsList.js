import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import {getStorage, ref as storageRef, deleteObject} from 'firebase/storage'
import { app } from '../firebase'
import '../components/petlist.css'
import { useNavigate} from 'react-router-dom'

const PetsList = () => {
  const [petData, setPetData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const db = getDatabase(app)
    const petRef = ref(db, 'pet')
    onValue(petRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data)
      setPetData(data)
    })
  }, [])
  const deleteData = (key) => {
    const db = getDatabase(app)
    const storage = getStorage(app)

    
    const petRef = ref(db, 'pet/' + key)
    const myRef = storageRef(storage,`images/`+key)
    deleteObject(myRef)
    .then(res=>{
      remove(petRef)
    })
    .catch(err=>{
      console.log(err)
    })
    
  }

  return (
    <div id='pet-list'>
      <h1>Pets List</h1>
      {petData && (
        <div>
          {Object.entries(petData).map(([key, value]) => {
            return (
              <div id='main-item'> 
                <div key={key} id='item'>
                <img id='img' alt='pet' src={value.imageUrl}/><br></br>
                  <p>Pet type:  {value.name} <br></br>Price:  {value.petprice}</p>
                    <button onClick={() => { deleteData(key) }}>Delete</button>
                    <button onClick={() => { navigate('/dashboard/updatepet',{state:[key,value]})}}>Update</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PetsList