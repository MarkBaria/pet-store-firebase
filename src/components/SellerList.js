import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import {collection, deleteDoc,doc, getDocs, getFirestore} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const SellerList = () => {
    const [sellerData,setSellerData] = useState([])
    const navigate = useNavigate()
    useEffect (()=>{
        getData()
    },[])
const getData = async () =>{
    const db = getFirestore(app)
        const docRef = collection(db,'seller')
        const docSnap = await getDocs(docRef)
        const data = docSnap.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log(data)
        setSellerData(data)
}
const deleteData = async (id) =>{
    const db = getFirestore(app)
    const dataRef = doc (db, 'seller', id)
    try{
        await deleteDoc(dataRef)
        getData()
    }
    catch(err)
    {
        console.log(err)
    }
}


  return (
    <div>
        <h1>SellerList</h1>
        {sellerData.map(seller=>{
            return(
                <div key={seller.id}>
                    <p>{seller.name} {seller.phoneNumber}</p>
                    <button onClick={()=>{deleteData(seller.id)}}>Delete</button>
                    <button onClick={() => { navigate('/dashboard/updateseller',{state:seller})}}>Update</button>
                </div>
            )
        })}

    </div>
  )
}

export default SellerList