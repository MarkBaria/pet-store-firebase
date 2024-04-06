import React from 'react'
import '../components/style.css'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div id='main-container'>
        <div id='side-nav'>
            <Link to='/dashboard/addpet' id='link'><b>Add Pet</b></Link>
            <Link to='/dashboard/petslist' id='link'><b>Pets List</b></Link>
            <Link to='/dashboard/addseller' id='link'><b>Add Seller</b></Link>
            <Link to='/dashboard/sellerlist' id='link'><b>Seller List</b></Link>
        </div>
        <div id='content'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard